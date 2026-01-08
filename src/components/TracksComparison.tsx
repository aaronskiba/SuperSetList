import Tracks from './Tracks';
import {SpotifyTracksComparisonProps} from '../types/SpotifyPlaylistProps';
import {View, StyleSheet} from 'react-native';

export default function TracksComparison({
  selectedPlaylists,
}: SpotifyTracksComparisonProps) {
  return (
    <View style={styles.container}>
      <Tracks spotifyPlaylist={selectedPlaylists[0]} size={'small'} />
      <Tracks spotifyPlaylist={selectedPlaylists[1]} size={'small'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});
