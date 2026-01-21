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
  spotifyTracks: SpotifyTrack[];
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

export type HeaderProps = {
  title: string;
  images: string[];
};

export type PlaylistHeaderProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export type CompareTracksHeaderProps = {
  spotifyPlaylists: SpotifyPlaylist[];
};
