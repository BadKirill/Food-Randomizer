import { API_BASE_URL } from '../config/api';
import type { ArchivedFilter, CreateDishPayload, DishDetail, DishFilter, DishListItem, LoginResponse, RandomNextResponse } from '../types';

async function parseApiError(response: Response): Promise<string | null> {
  try {
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) return null;
    const payload = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(payload.message)) return payload.message.join(', ');
    return payload.message ?? null;
  } catch {
    return null;
  }
}

async function readJson<T>(response: Response, fallback: string): Promise<T> {
  if (!response.ok) {
    const apiMessage = await parseApiError(response);
    throw new Error(apiMessage ?? `${fallback}: ${response.status}`);
  }
  return (await response.json()) as T;
}

export function formatClientError(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    if (error.message === 'Network request failed') {
      return 'Cannot reach API. Check API URL, server status, and Android HTTP settings.';
    }
    return error.message;
  }
  return fallback;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password }),
  });
  return readJson<LoginResponse>(response, 'Login failed');
}

export async function register(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password }),
  });
  return readJson<LoginResponse>(response, 'Register failed');
}

export async function logout(token: string) {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function fetchRandomDish(token: string, dishTypeFilter: DishFilter) {
  const body = dishTypeFilter === 'all' ? { cooldownClicks: 4 } : { cooldownClicks: 4, dishType: dishTypeFilter };
  const response = await fetch(`${API_BASE_URL}/random/next`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return readJson<RandomNextResponse>(response, 'API error');
}

export async function fetchDishes(filter: DishFilter, archived: ArchivedFilter) {
  const params = new URLSearchParams();
  params.set('archived', archived);
  if (filter !== 'all') params.set('dishType', filter);
  const response = await fetch(`${API_BASE_URL}/dishes?${params.toString()}`);
  return readJson<DishListItem[]>(response, 'API error');
}

export async function fetchDishById(dishId: string) {
  const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`);
  return readJson<DishDetail>(response, 'API error');
}

export async function createDish(token: string, payload: CreateDishPayload) {
  const response = await fetch(`${API_BASE_URL}/dishes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return readJson<DishDetail>(response, 'API error');
}

export async function updateDish(token: string, dishId: string, payload: CreateDishPayload) {
  const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return readJson<DishDetail>(response, 'API error');
}

export async function archiveDish(token: string, dishId: string) {
  const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return readJson<{ id: string; archivedAt: string | null }>(response, 'API error');
}

export async function unarchiveDish(token: string, dishId: string) {
  const response = await fetch(`${API_BASE_URL}/dishes/${dishId}/unarchive`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return readJson<{ id: string; archivedAt: string | null }>(response, 'API error');
}
