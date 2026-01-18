import {SPOTIFY_API_BASE_URL} from './constants';
import {spotifyFetch} from './spotifyApi';
import {
  SpotifyPlaylist,
  SpotifyPlaylistResponse,
} from '../types/SpotifyPlaylist';

export const getPlaylists = async (
  accessToken: string,
): Promise<SpotifyPlaylist[]> => {
  const url = `${SPOTIFY_API_BASE_URL}/me/playlists`;
  const data: SpotifyPlaylistResponse = await spotifyFetch(url, accessToken);
  return data.items; // data.items == SpotifyPlaylist[]
};
