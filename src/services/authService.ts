import {authorize} from 'react-native-app-auth';
import spotifyAuthConfig from '../config/spotifyAuthConfig';
import {SpotifyAuth} from '../types/SpotifyAuth';

export const handleSpotifyAuth = async (): Promise<SpotifyAuth> => {
  try {
    const spotifyAuthData = await authorize(spotifyAuthConfig);
    return spotifyAuthData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
