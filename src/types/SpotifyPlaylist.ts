// https://developer.spotify.com/documentation/web-api/reference/

export interface SpotifyPlaylistResponse {
  items: SpotifyPlaylist[];
  total: number;
}

export interface SpotifyTrackResponse {
  items: {
    track: SpotifyTrack;
  }[];
  total: number;
}

export interface SpotifyPlaylist {
  id: string;
  external_urls: {
    spotify: string;
  };
  name: string;
  description: string;
  tracks: {
    href: string;
    total: number;
  };
  images: {
    url: string;
  }[];
}

export interface SpotifyTrack {
  id: string;
  album: {
    name: string;
    images: {
      url: string;
    }[];
  };
  artists: {
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
  name: string;
}
