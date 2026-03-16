import {SpotifyImages} from '../types/SpotifyPlaylist';

export const getUriFromImages = (images: SpotifyImages): string | null => {
  return images?.[0]?.url?.trim() || null;
};
