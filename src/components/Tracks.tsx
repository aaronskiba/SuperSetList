import Track from './Track';
import {SpotifyTracksProps} from '../types/SpotifyPlaylistProps';
import {FlatList} from 'react-native';

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
