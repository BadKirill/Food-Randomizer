import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../theme';

type AuthPanelProps = {
  loginEmail: string;
  loginPassword: string;
  saveLoading: boolean;
  manageError: string | null;
  manageMessage: string | null;
  onLoginEmailChange: (value: string) => void;
  onLoginPasswordChange: (value: string) => void;
  onClearEmail: () => void;
  onClearPassword: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

export function AuthPanel({
  loginEmail,
  loginPassword,
  saveLoading,
  manageError,
  manageMessage,
  onLoginEmailChange,
  onLoginPasswordChange,
  onClearEmail,
  onClearPassword,
  onLogin,
  onRegister,
}: AuthPanelProps) {
  return (
    <>
      <Text style={styles.hintText}>Login or register to open dish management.</Text>
      <Text style={styles.fieldLabel}>Email</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={loginEmail}
          onChangeText={onLoginEmailChange}
          placeholder="Your email"
          placeholderTextColor="#63736d"
          style={styles.inputControl}
          autoCapitalize="none"
        />
        {loginEmail.length > 0 ? (
          <Pressable onPress={onClearEmail} style={({ pressed }) => [styles.inputClearBtn, pressed ? styles.buttonPressed : null]}>
            <Text style={styles.inputClearBtnText}>×</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.fieldLabel}>Password</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={loginPassword}
          onChangeText={onLoginPasswordChange}
          placeholder="Password (min 8 chars)"
          placeholderTextColor="#63736d"
          style={styles.inputControl}
          secureTextEntry
        />
        {loginPassword.length > 0 ? (
          <Pressable onPress={onClearPassword} style={({ pressed }) => [styles.inputClearBtn, pressed ? styles.buttonPressed : null]}>
            <Text style={styles.inputClearBtnText}>×</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.authActionsRow}>
        <Pressable
          testID="auth-login-button"
          onPress={onLogin}
          disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8}
          style={({ pressed }) => [styles.secondaryButton, styles.authActionButton, pressed ? styles.buttonPressed : null]}
        >
          <Text style={styles.secondaryButtonText}>Login</Text>
        </Pressable>
        <Pressable
          testID="auth-register-button"
          onPress={onRegister}
          disabled={saveLoading || loginEmail.trim().length === 0 || loginPassword.length < 8}
          style={({ pressed }) => [styles.secondaryButton, styles.authActionButton, pressed ? styles.buttonPressed : null]}
        >
          <Text style={styles.secondaryButtonText}>Register</Text>
        </Pressable>
      </View>
      {manageError ? <Text style={styles.error}>{manageError}</Text> : null}
      {manageMessage ? <Text style={styles.success}>{manageMessage}</Text> : null}
    </>
  );
}
