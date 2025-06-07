import {Image, StyleSheet, Text, View} from 'react-native';
import {SpotifyPlaylistProps} from '../types/SpotifyPlaylistProps';

export default function Playlist({spotifyPlaylist}: SpotifyPlaylistProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: spotifyPlaylist.images[0]?.url}}
        style={{width: 100, height: 100}}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{spotifyPlaylist.name}</Text>
        <Text style={styles.description}>{spotifyPlaylist.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // image and text side-by-side
    borderColor: 'grey',
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: 'column', // image and text side-by-side
    paddingLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    color: '#666',
    fontSize: 14,
  },
});
