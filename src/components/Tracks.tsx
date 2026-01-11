import Track from './Track';
import {SpotifyTracksProps} from '../types/SpotifyPlaylistProps';
import ListHeader from './ListHeader';
import {View, StyleSheet, FlatList} from 'react-native';

export default function Tracks({
  spotifyPlaylist,
  spotifyTracks,
  size = 'large',
}: SpotifyTracksProps) {
  return (
    <View style={styles.column}>
      <ListHeader spotifyPlaylist={spotifyPlaylist} />
      <FlatList
        data={spotifyTracks}
        renderItem={({item}) => <Track spotifyTrack={item} size={size} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
});
