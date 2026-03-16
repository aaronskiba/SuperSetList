import {SpotifyPlaylist} from '../../types/SpotifyPlaylist';
import {getUriFromImages} from '../../utils/spotifyImages';
import Header from './Header';

type PlaylistHeaderProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export default function PlaylistHeader({spotifyPlaylist}: PlaylistHeaderProps) {
  return (
    <Header
      title={`${spotifyPlaylist.name} Tracks`}
      imageUris={[getUriFromImages(spotifyPlaylist.images)]}
    />
  );
}
