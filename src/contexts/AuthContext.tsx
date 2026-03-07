import {createContext, useContext, useState, useRef, ReactNode} from 'react';
import {SpotifyAuth, SpotifyRefreshResponse} from '../types/SpotifyAuth';
import {handleSpotifyAuth, getRefreshToken} from '../services/authService';
import {
  isValidToken,
  getUpdatedAuthFromRefreshResponse,
} from '../utils/authToken';

interface AuthContextType {
  isAuthenticated: boolean;
  getValidAccessToken: () => Promise<string | null>;
  login: () => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [auth, setAuth] = useState<SpotifyAuth | null>(null);
  const refreshTokenPromiseRef = useRef<Promise<string | null> | null>(null);

  const handleTokenRefresh = async (authSnapshot: SpotifyAuth) => {
    try {
      const response: SpotifyRefreshResponse = await getRefreshToken(
        authSnapshot,
      );
      const updatedAuth = getUpdatedAuthFromRefreshResponse(
        authSnapshot,
        response,
      );
      setAuth(updatedAuth);
      return updatedAuth.accessToken;
    } catch (err) {
      setAuth(null);
      throw err;
    } finally {
      refreshTokenPromiseRef.current = null;
    }
  };

  const getValidAccessToken = async () => {
    if (!auth) return null;
    if (isValidToken(auth)) return auth.accessToken;
    // If a refresh is already in progress, return the same promise
    // (Prevents concurrent requests from triggering multiple getRefreshToken() calls)
    if (refreshTokenPromiseRef.current) return refreshTokenPromiseRef.current;
    // Initiate a refresh and store the promise for other callers to await
    // (After it's completion, handleTokenRefresh clears the ref)
    refreshTokenPromiseRef.current = handleTokenRefresh(auth);
    return refreshTokenPromiseRef.current;
  };

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

  // "authenticated" is having (or being able to obtain) a valid access token
  const isAuthenticated = !!auth?.accessToken || !!auth?.refreshToken;

  return (
    <AuthContext.Provider
      value={{isAuthenticated, getValidAccessToken, login, logout}}>
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
