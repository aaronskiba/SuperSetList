import {SpotifyPlaylist, SpotifyTrack} from './SpotifyPlaylist';

type SpotifyPlaylistActions = {
  updateSelectedPlaylists: (p: SpotifyPlaylist) => void;
  focusPlaylist: (p: SpotifyPlaylist) => void;
};

export type SpotifyPlaylistsProps = SpotifyPlaylistActions & {
  selectedPlaylists: SpotifyPlaylist[];
};

export type SpotifyPlaylistProps = SpotifyPlaylistActions & {
  spotifyPlaylist: SpotifyPlaylist;
  isSelected: boolean;
};

export type SpotifyTracksProps = {
  spotifyPlaylist: SpotifyPlaylist;
  unfocusPlaylist: () => void;
};

export type SpotifyTrackProps = {
  spotifyTrack: SpotifyTrack;
};

export type AuthButtonProps = {
  clearAllPlaylists: () => void;
};

export type BackButtonProps = {
  unfocusPlaylist: () => void;
};

export type ListHeaderProps = {
  spotifyPlaylist?: SpotifyPlaylist;
};
