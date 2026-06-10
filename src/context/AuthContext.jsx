import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "notabot_auth_session";

const demoUser = {
  email: "admin@notabot.com",
  name: "Coordinador NotaBot",
  role: "Coordinacion academica",
};

function getStoredSession() {
  try {
    const session = localStorage.getItem(STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredSession);

  const login = async ({ email, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 650));

    const isValidEmail = email.trim().toLowerCase() === demoUser.email;
    const isValidPassword = password === "123456";

    if (!isValidEmail || !isValidPassword) {
      return {
        ok: false,
        message: "Credenciales inválidas",
      };
    }

    const session = {
      ...demoUser,
      authenticatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);

    return {
      ok: true,
      user: session,
    };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
