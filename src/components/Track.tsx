import {Image, StyleSheet, Text, View} from 'react-native';
import {SpotifyTrack} from '../types/SpotifyPlaylist';
import {getUriFromImages} from '../utils/spotifyImages';

type SpotifyTrackProps = {
  spotifyTrack: SpotifyTrack;
  size?: 'small' | 'large';
};

const IMAGE_SIZE_MAP = {
  small: 65,
  large: 100,
};

export default function Track({
  spotifyTrack,
  size = 'large',
}: SpotifyTrackProps) {
  const imageUri = getUriFromImages(spotifyTrack.album.images);
  const imageSize = IMAGE_SIZE_MAP[size];
  return (
    <View style={styles.container}>
      {imageUri && (
        <Image
          source={{uri: imageUri}}
          style={{width: imageSize, height: imageSize}}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{spotifyTrack.name}</Text>
        <Text style={styles.description}>{spotifyTrack.artists[0].name}</Text>
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
