import {CompareTracksHeaderProps} from '../../types/SpotifyPlaylistProps';
import Header from './Header';

export default function CompareTracksHeader({
  spotifyPlaylists,
}: CompareTracksHeaderProps) {
  return (
    <Header
      title={`${spotifyPlaylists[0].name} <--> ${spotifyPlaylists[1].name}`}
      images={spotifyPlaylists.map(p => p.images[0]?.url)}
    />
  );
}
