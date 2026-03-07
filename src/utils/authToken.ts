import {SpotifyAuth, SpotifyRefreshResponse} from '../types/SpotifyAuth';

// For addressing edge cases
// - (i.e. when a request fires right at token expiry time)
const ACCESS_TOKEN_EXPIRY_BUFFER = 15_000; // 15-sec

export const isValidToken = (auth: SpotifyAuth): boolean => {
  const expiry = new Date(auth.accessTokenExpirationDate).getTime();
  if (!Number.isFinite(expiry)) return false;
  return expiry > Date.now() + ACCESS_TOKEN_EXPIRY_BUFFER;
};

export const getAccessTokenExpirationDate = (expires_in: number) => {
  return new Date(Date.now() + expires_in * 1000).toISOString();
};

// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
export const getUpdatedAuthFromRefreshResponse = (
  auth: SpotifyAuth,
  response: SpotifyRefreshResponse,
) => {
  return {
    ...auth,
    accessToken: response.access_token,
    refreshToken: response.refresh_token ?? auth.refreshToken,
    accessTokenExpirationDate: getAccessTokenExpirationDate(
      response.expires_in,
    ),
  };
};
