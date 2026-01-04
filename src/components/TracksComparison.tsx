import Tracks from './Tracks';
import {SpotifyTracksComparisonProps} from '../types/SpotifyPlaylistProps';
import {View, StyleSheet} from 'react-native';

export default function TracksComparison({
  selectedPlaylists,
}: SpotifyTracksComparisonProps) {
  return (
    <View style={styles.container}>
      <Tracks spotifyPlaylist={selectedPlaylists[0]} />
      <Tracks spotifyPlaylist={selectedPlaylists[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
