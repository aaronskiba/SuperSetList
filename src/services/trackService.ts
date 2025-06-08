import {SpotifyTrack, SpotifyTrackResponse} from '../types/SpotifyPlaylist';

export const getPlaylistTracks = async (
  playlist_id: string,
  accessToken: string,
): Promise<SpotifyTrack[] | null> => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
    }
    const data: SpotifyTrackResponse = await response.json();
    const tracks = data.items.map(item => item.track);
    return tracks;
  } catch (e) {
    console.error('Error fetching tracks: ', e);
    return null;
  }
};
