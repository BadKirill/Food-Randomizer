import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { DEFAULT_LOGIN_EMAIL } from '../config/api';
import type { LoginResponse } from '../types';

const SESSION_STORAGE_KEY = 'randomeal.session.v1';

function isStoredSessionUsable(session: LoginResponse): boolean {
  return Boolean(session.token && session.user?.id && Date.parse(session.expiresAt) > Date.now());
}

export function useAuthSession() {
  const [loginEmail, setLoginEmail] = useState(DEFAULT_LOGIN_EMAIL);
  const [loginPassword, setLoginPassword] = useState('');
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    SecureStore.getItemAsync(SESSION_STORAGE_KEY)
      .then((rawSession) => {
        if (!mounted || !rawSession) return;
        const session = JSON.parse(rawSession) as LoginResponse;
        if (!isStoredSessionUsable(session)) {
          void SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
          return;
        }
        applySessionState(session);
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  function applySessionState(payload: LoginResponse, message?: string) {
    setSessionToken(payload.token);
    setCurrentUserId(payload.user.id);
    setCurrentUserEmail(payload.user.email);
    if (payload.user.email) setLoginEmail(payload.user.email);
    return message;
  }

  async function storeSession(payload: LoginResponse) {
    applySessionState(payload);
    await SecureStore.setItemAsync(SESSION_STORAGE_KEY, JSON.stringify(payload));
  }

  async function forgetSession() {
    setSessionToken(null);
    setCurrentUserId(null);
    setCurrentUserEmail(null);
    try {
      await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
    } catch {
      // In-memory logout still matters even if storage fails.
    }
  }

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    sessionToken,
    currentUserId,
    currentUserEmail,
    isAuthenticated: Boolean(sessionToken),
    storeSession,
    forgetSession,
  };
}
