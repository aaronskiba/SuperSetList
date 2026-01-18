import {SPOTIFY_API_BASE_URL} from './constants';
import {spotifyFetch} from './spotifyApi';
import {SpotifyTrack, SpotifyTrackResponse} from '../types/SpotifyPlaylist';

export const getPlaylistTracks = async (
  playlist_id: string,
  accessToken: string,
): Promise<SpotifyTrack[]> => {
  const url = `${SPOTIFY_API_BASE_URL}/playlists/${playlist_id}/tracks`;
  const data: SpotifyTrackResponse = await spotifyFetch(url, accessToken);
  return data.items.map(item => item.track);
};
