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
  size?: 'small' | 'large';
};

export type SpotifyTracksComparisonProps = {
  selectedPlaylists: SpotifyPlaylist[];
};

export type SpotifyTrackProps = {
  spotifyTrack: SpotifyTrack;
  size?: 'small' | 'large';
};

export type AuthButtonProps = {
  clearAllPlaylists: () => void;
};

export type BackToPlaylistsButtonProps = {
  clearAllPlaylists: () => void;
};

export type ListHeaderProps = {
  spotifyPlaylist?: SpotifyPlaylist;
};
