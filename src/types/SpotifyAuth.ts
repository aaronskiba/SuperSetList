export type SpotifyAuth = {
  accessToken: string;
  accessTokenExpirationDate: string; // ISO date string
  authorizeAdditionalParameters?: Record<string, any>;
  idToken: string | null;
  refreshToken: string;
  scopes: string[];
  tokenAdditionalParameters?: Record<string, any>;
  tokenType: string;
};

// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
export type SpotifyRefreshResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
};
