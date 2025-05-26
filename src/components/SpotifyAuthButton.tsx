import {Pressable, StyleSheet, Text} from 'react-native';
import {handleSpotifyAuth} from '../services/authService';
import {SpotifyAuthButtonProps} from '../types/SpotifyAuthButtonProps';

export default function SpotifyAuthButton({
  spotifyAuth,
  setSpotifyAuth,
}: SpotifyAuthButtonProps) {
  const updateSpotifyAuth = async () => {
    if (spotifyAuth) {
      setSpotifyAuth(null);
    } else {
      const authData = await handleSpotifyAuth();
      setSpotifyAuth(authData);
    }
  };
  return (
    <Pressable onPress={updateSpotifyAuth} style={styles.loginButton}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>
        {spotifyAuth ? 'Logout From Spotify' : 'Connect to Spotify Account'}
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
