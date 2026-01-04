import {Pressable, StyleSheet, Text} from 'react-native';
import {SPOTIFY_GREEN} from '../theme/colors';
import {BackButtonProps} from '../types/SpotifyPlaylistProps';

export default function BackButton({clearAllPlaylists}: BackButtonProps) {
  return (
    <Pressable onPress={clearAllPlaylists} style={styles.loginButton}>
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
    backgroundColor: SPOTIFY_GREEN,
    padding: 10,
    borderRadius: 8,
    width: '95%',
  },
});
