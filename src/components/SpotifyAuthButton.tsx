import {StyleSheet, Text, TouchableOpacity} from 'react-native';
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
    <TouchableOpacity onPress={updateSpotifyAuth} style={styles.loginButton}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>
        {spotifyAuth ? 'Disconnect from Spotify' : 'Connect to Spotify'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#1ED760', // Spotify green color
    alignItems: 'center',
  },
});
