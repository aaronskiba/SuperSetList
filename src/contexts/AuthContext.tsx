import {createContext, useContext, useState, ReactNode} from 'react';
import {SpotifyAuth} from '../types/SpotifyAuth';
import {handleSpotifyAuth} from '../services/authService';

// For addressing edge cases
// - (i.e. when a request fires right at token expiry time)
const ACCESS_TOKEN_EXPIRY_BUFFER = 15_000; // 15-sec

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const isExpiredToken = (auth: SpotifyAuth): boolean => {
  const expiry = new Date(auth.accessTokenExpirationDate).getTime();
  return !expiry || expiry < Date.now() + ACCESS_TOKEN_EXPIRY_BUFFER;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [auth, setAuth] = useState<SpotifyAuth | null>(null);

  const login = async () => {
    try {
      const authData: SpotifyAuth = await handleSpotifyAuth();
      setAuth(authData);
    } catch (err) {
      console.error('Spotify login failed: ', err);
      setAuth(null);
    }
  };

  const logout = () => setAuth(null);

  const accessToken = !auth || isExpiredToken(auth) ? null : auth.accessToken;
  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{accessToken, isAuthenticated, login, logout}}>
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
