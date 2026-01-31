import {SpotifyTrack} from '../types/SpotifyPlaylist';
import Track from './Track';
import {FlatList} from 'react-native';

type SpotifyTracksProps = {
  spotifyTracks: SpotifyTrack[];
  size?: 'small' | 'large';
};

export default function Tracks({
  spotifyTracks,
  size = 'large',
}: SpotifyTracksProps) {
  return (
    <FlatList
      data={spotifyTracks}
      renderItem={({item}) => <Track spotifyTrack={item} size={size} />}
      keyExtractor={item => item.id}
    />
  );
}
