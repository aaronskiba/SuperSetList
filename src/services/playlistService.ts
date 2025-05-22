import {
  SpotifyPlaylist,
  SpotifyPlaylistResponse,
} from '../types/SpotifyPlaylist';

export const getPlaylists = async (
  accessToken: string,
): Promise<SpotifyPlaylist[] | null> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
    }
    const data: SpotifyPlaylistResponse = await response.json();
    return data.items; // data.items == SpotifyPlaylist[]
  } catch (e) {
    console.error('Error fetching playlists: ', e);
    return null;
  }
};
