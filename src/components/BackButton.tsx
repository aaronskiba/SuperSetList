import {Pressable, StyleSheet, Text} from 'react-native';
import {BackButtonProps} from '../types/SpotifyPlaylistProps';

export default function BackButton({unselectPlaylist}: BackButtonProps) {
  return (
    <Pressable onPress={unselectPlaylist} style={styles.loginButton}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>
        {'Return to Playlists'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#1ED760', // Spotify green color
    padding: 10,
    borderRadius: 8,
    width: '95%',
  },
});
