import {getPlaylists} from '../services/playlistService';
import {getPlaylistTracks} from '../services/trackService';
import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import {useFetch} from './useFetch';

export const useFetchPlaylists = () => {
  return useFetch<SpotifyPlaylist[] | null>(
    (accessToken, signal) => getPlaylists(accessToken, signal),
    [],
  );
};

export const useFetchTracks = (playlistId: string) => {
  return useFetch<SpotifyTrack[] | null>(
    (accessToken, signal) => getPlaylistTracks(playlistId, accessToken, signal),
    [playlistId],
  );
};
