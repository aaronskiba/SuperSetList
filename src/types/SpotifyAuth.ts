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
