import {authorize} from 'react-native-app-auth';
import spotifyAuthConfig from '../config/spotifyAuthConfig';
import {SpotifyAuth, SpotifyRefreshResponse} from '../types/SpotifyAuth';

const REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
export const getRefreshToken = async (
  auth: SpotifyAuth,
): Promise<SpotifyRefreshResponse> => {
  const response = await fetch(REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: auth.refreshToken,
      client_id: spotifyAuthConfig.clientId,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Spotify token refresh failed: ${response.status}`);
  }

  return response.json();
};

export const handleSpotifyAuth = async (): Promise<SpotifyAuth> => {
  try {
    const spotifyAuthData = await authorize(spotifyAuthConfig);
    return spotifyAuthData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
