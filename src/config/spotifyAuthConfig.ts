const spotifyAuthConfig = {
  issuer: 'https://accounts.spotify.com',
  clientId: 'e653508634504dbe874915f12cfee829',
  redirectUrl: 'com.supersetlist://callback',
  scopes: ['user-read-email', 'playlist-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export default spotifyAuthConfig;
