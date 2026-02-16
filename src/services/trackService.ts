import {SPOTIFY_API_BASE_URL} from './constants';
import {spotifyFetch} from './spotifyApi';
import {SpotifyTrack, SpotifyTrackResponse} from '../types/SpotifyPlaylist';

export const getPlaylistTracks = async (
  playlist_id: string,
  accessToken: string,
  signal?: AbortSignal,
): Promise<SpotifyTrack[]> => {
  const url = `${SPOTIFY_API_BASE_URL}/playlists/${playlist_id}/tracks`;
  const data: SpotifyTrackResponse = await spotifyFetch(
    url,
    accessToken,
    signal,
  );
  return data.items.map(item => item.track);
};
