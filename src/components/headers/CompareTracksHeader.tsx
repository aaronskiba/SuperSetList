import {SpotifyPlaylist} from '../../types/SpotifyPlaylist';
import Header from './Header';
import {getUriFromImages} from '../../utils/spotifyImages';

type CompareTracksHeaderProps = {
  spotifyPlaylists: SpotifyPlaylist[];
};

export default function CompareTracksHeader({
  spotifyPlaylists,
}: CompareTracksHeaderProps) {
  return (
    <Header
      title={`${spotifyPlaylists[0].name} <--> ${spotifyPlaylists[1].name}`}
      imageUris={spotifyPlaylists.map(p => getUriFromImages(p.images))}
    />
  );
}
