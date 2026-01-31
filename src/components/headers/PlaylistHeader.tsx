import {SpotifyPlaylist} from '../../types/SpotifyPlaylist';
import Header from './Header';

type PlaylistHeaderProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export default function PlaylistHeader({spotifyPlaylist}: PlaylistHeaderProps) {
  return (
    <Header
      title={`${spotifyPlaylist.name} Tracks`}
      images={[spotifyPlaylist.images[0].url]}
    />
  );
}
