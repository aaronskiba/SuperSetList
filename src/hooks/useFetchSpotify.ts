import {getPlaylists} from '../services/playlistService';
import {getPlaylistTracks} from '../services/trackService';
import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import {useFetch} from './useFetch';

export const useFetchPlaylists = (accessToken: string) => {
  return useFetch<SpotifyPlaylist[]>(
    signal => getPlaylists(accessToken, signal),
    [accessToken],
  );
};

export const useFetchTracks = (playlistId: string, accessToken: string) => {
  return useFetch<SpotifyTrack[]>(
    signal => getPlaylistTracks(playlistId, accessToken, signal),
    [accessToken, playlistId],
  );
};
