const AUTH_KEY = 'lumastudio_admin_auth';
const AUTH_DURATION_MS = 8 * 60 * 60 * 1000; // 8h session
export const DEFAULT_ADMIN_PASSPHRASE = 'luma-admin-2026';

export const getAdminPassphrase = (): string => {
  const env = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_ADMIN_PASSPHRASE : undefined;
  return typeof env === 'string' && env.trim() ? env.trim() : DEFAULT_ADMIN_PASSPHRASE;
};

interface AuthSession {
  ok: boolean;
  expiresAt: number;
}

const readSession = (): AuthSession => {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return { ok: false, expiresAt: 0 };
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed.ok && parsed.expiresAt > Date.now()) return parsed;
    sessionStorage.removeItem(AUTH_KEY);
    return { ok: false, expiresAt: 0 };
  } catch {
    return { ok: false, expiresAt: 0 };
  }
};

export const isAuthenticated = (): boolean => readSession().ok;

export const login = (passphrase: string): boolean => {
  const ok = passphrase === getAdminPassphrase();
  if (ok) {
    const session: AuthSession = { ok: true, expiresAt: Date.now() + AUTH_DURATION_MS };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }
  return ok;
};

export const logout = (): void => {
  sessionStorage.removeItem(AUTH_KEY);
};