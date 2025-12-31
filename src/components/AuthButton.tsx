import {Pressable, StyleSheet, Text} from 'react-native';
import {SPOTIFY_GREEN} from '../theme/colors';
import {useAuth} from '../contexts/AuthContext';

export default function AuthButton() {
  const {login, logout, isAuthenticated} = useAuth();

  const handleOnPress = () => {
    isAuthenticated ? logout() : login();
  };
  return (
    <Pressable onPress={handleOnPress} style={styles.loginButton}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>
        {isAuthenticated ? 'Logout From Spotify' : 'Connect to Spotify Account'}
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
