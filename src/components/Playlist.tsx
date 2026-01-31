import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {PLAYLIST_BG} from '../theme/colors';
import {SpotifyPlaylistActions} from '../types/SpotifyPlaylistProps';
import {SpotifyPlaylist} from '../types/SpotifyPlaylist';

type SpotifyPlaylistProps = SpotifyPlaylistActions & {
  spotifyPlaylist: SpotifyPlaylist;
  isSelected: boolean;
};

export default function Playlist({
  spotifyPlaylist,
  isSelected,
  updateSelectedPlaylists,
  focusPlaylist,
}: SpotifyPlaylistProps) {
  const getBackgroundColor = (pressed: boolean) => {
    if (pressed) return PLAYLIST_BG.pressed;
    return isSelected ? PLAYLIST_BG.selected : PLAYLIST_BG.default;
  };
  return (
    <Pressable
      onPress={() => updateSelectedPlaylists(spotifyPlaylist)}
      onLongPress={() => focusPlaylist(spotifyPlaylist)}
      style={({pressed}) => [
        {
          backgroundColor: getBackgroundColor(pressed),
        },
      ]}>
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
    </Pressable>
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
