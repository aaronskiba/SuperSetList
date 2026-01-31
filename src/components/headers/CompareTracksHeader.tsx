import {SpotifyPlaylist} from '../../types/SpotifyPlaylist';
import Header from './Header';

type CompareTracksHeaderProps = {
  spotifyPlaylists: SpotifyPlaylist[];
};

export default function CompareTracksHeader({
  spotifyPlaylists,
}: CompareTracksHeaderProps) {
  return (
    <Header
      title={`${spotifyPlaylists[0].name} <--> ${spotifyPlaylists[1].name}`}
      images={spotifyPlaylists.map(p => p.images[0].url)}
    />
  );
}
