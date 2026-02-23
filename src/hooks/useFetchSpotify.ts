import {getPlaylists} from '../services/playlistService';
import {getPlaylistTracks} from '../services/trackService';
import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import {useFetch} from './useFetch';

export const useFetchPlaylists = (accessToken: string | null) => {
  return useFetch<SpotifyPlaylist[] | null>(
    signal =>
      accessToken ? getPlaylists(accessToken, signal) : Promise.resolve(null),
    [accessToken],
  );
};

export const useFetchTracks = (
  playlistId: string,
  accessToken: string | null,
) => {
  return useFetch<SpotifyTrack[] | null>(
    signal =>
      accessToken
        ? getPlaylistTracks(playlistId, accessToken, signal)
        : Promise.resolve(null),
    [accessToken, playlistId],
  );
};
