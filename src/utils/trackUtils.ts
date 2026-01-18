import {SpotifyTrack} from '../types/SpotifyPlaylist';

export function getSharedTracks(
  leftTracks: SpotifyTrack[],
  rightTracks: SpotifyTrack[],
): SpotifyTrack[] {
  const rightIds = new Set(rightTracks.map(t => t.id));
  return leftTracks.filter(t => rightIds.has(t.id));
}
