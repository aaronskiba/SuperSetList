import {PlaylistHeaderProps} from '../../types/SpotifyPlaylistProps';
import Header from './Header';

export default function PlaylistHeader({spotifyPlaylist}: PlaylistHeaderProps) {
  return (
    <Header
      title={`${spotifyPlaylist.name} Tracks`}
      images={[spotifyPlaylist.images[0]?.url]}
    />
  );
}
