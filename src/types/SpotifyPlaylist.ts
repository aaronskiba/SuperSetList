export interface SpotifyPlaylistResponse {
  items: SpotifyPlaylist[];
  total: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  tracks: {href: string; total: number};
  images: {url: string}[];
}
