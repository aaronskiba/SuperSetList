const spotifyAuthConfig = {
  issuer: 'https://accounts.spotify.com',
  clientId: '611fa35d48e94daaa0d828a3c14a535f',
  redirectUrl: 'com.supersetlist://callback',
  scopes: ['user-read-email', 'playlist-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export default spotifyAuthConfig;
