import {createContext, useContext, useState, ReactNode} from 'react';
import {SpotifyAuth} from '../types/SpotifyAuth';
import {handleSpotifyAuth} from '../services/authService';

interface AuthContextType {
  auth: SpotifyAuth | null;
  login: () => void | Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [auth, setAuth] = useState<SpotifyAuth | null>(null);

  const login = async () => {
    try {
      const authData: SpotifyAuth = await handleSpotifyAuth();
      setAuth(authData);
    } catch (err) {
      console.error('Spotify login failed: ', err);
    }
  };

  const logout = () => setAuth(null);

  // TODO: isAuthenticated currently only checks for accessToken presence.
  // Token expiry is not validated, so expired tokens may be treated as authenticated
  // until this is addressed.
  const isAuthenticated = !!auth?.accessToken;

  return (
    <AuthContext.Provider value={{auth, login, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
