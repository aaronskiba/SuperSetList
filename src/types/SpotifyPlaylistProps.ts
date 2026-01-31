import {SpotifyPlaylist} from './SpotifyPlaylist';

export type SpotifyPlaylistActions = {
  updateSelectedPlaylists: (p: SpotifyPlaylist) => void;
  focusPlaylist: (p: SpotifyPlaylist) => void;
};
