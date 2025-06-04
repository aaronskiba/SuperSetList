import {StyleSheet, Text} from 'react-native';
import SpotifyAuthButton from './components/SpotifyAuthButton';
import {useAuth} from './contexts/AuthContext';
import PlaylistList from './components/PlaylistList';

function App(): React.JSX.Element {
  const isAuthenticated = useAuth();

  return (
    <>
      <Text style={styles.title}>SuperSetList</Text>
      <SpotifyAuthButton />
      {isAuthenticated && <PlaylistList />}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#1ED760', // Spotify green color
    alignItems: 'center',
  },
});

export default App;
