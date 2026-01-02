import {StyleSheet, Text, View, Image} from 'react-native';
import {ListHeaderProps} from '../types/SpotifyPlaylistProps';
import {useAuth} from '../contexts/AuthContext';

export default function ListHeader({spotifyPlaylist}: ListHeaderProps) {
  const {isAuthenticated} = useAuth();

  const getTitle = () => {
    if (!isAuthenticated) {
      return 'SuperSetlist';
    }
    return spotifyPlaylist ? `${spotifyPlaylist.name} Tracks` : 'All Playlists';
  };
  return (
    <View style={styles.header}>
      <Image
        source={{uri: spotifyPlaylist?.images[0].url}}
        style={{width: 50, height: 50, borderRadius: 50 / 2}}
      />
      <Text style={styles.title}>{getTitle()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {alignItems: 'center'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
