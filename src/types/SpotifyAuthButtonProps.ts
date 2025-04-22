import {SpotifyAuth} from './SpotifyAuth';

export type SpotifyAuthButtonProps = {
  spotifyAuth: SpotifyAuth | null;
  setSpotifyAuth: (auth: SpotifyAuth | null) => void;
};
