import {SpotifyPlaylist, SpotifyTrack} from './SpotifyPlaylist';

export type SpotifyPlaylistsProps = {
  selectPlaylist: (p: SpotifyPlaylist) => void;
};

export type SpotifyPlaylistProps = {
  spotifyPlaylist: SpotifyPlaylist;
  selectPlaylist: (p: SpotifyPlaylist) => void;
};

export type BackButtonProps = {
  unselectPlaylist: () => void;
};

export type SpotifyTracksProps = {
  spotifyPlaylist: SpotifyPlaylist;
  unselectPlaylist: () => void;
};

export type SpotifyTrackProps = {
  spotifyTrack: SpotifyTrack;
};
