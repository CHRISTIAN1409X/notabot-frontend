import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/apiAxios'; 
import { baseUrl } from '../../hostConfig';

const AuthContext = createContext(null);
const STORAGE_KEY = 'notabot_auth_user';

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
 
  const [user, setUser] = useState(getStoredUser);

 
  const login = async ({ email, password }) => {
    try {
      const response = await api.post('/login', {
        email: email,
        passwordHash: password,
      });

      if (response.status === 200) {

        // CONSULTAR USUARIO AUTENTICADO
        const verifyResponse = await api.get('/api/auth/verify');

        const authUser = verifyResponse.data;

        const sessionUser = {
          name: authUser.username,
          username: authUser.username,
          email: authUser.email || "Sin correo",
          authenticatedAt: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));

        setUser(sessionUser);

        return { ok: true };
      }

      return {
        ok: false,
        message: 'Credenciales inválidas',
      };

    } catch (error) {

      return {
        ok: false,
        message:
          error.response?.data?.message ||
          error.message ||
          'Error de red',
      };
    }
  };


  const logout = async () => {
    try {
     
      await fetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', 
      });
    } catch (error) {
      console.error('Error al notificar cierre de sesión al servidor', error);
    } finally {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    }
  };

 
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

