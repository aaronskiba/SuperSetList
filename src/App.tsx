import {StyleSheet, Text} from 'react-native';
import AuthButton from './components/AuthButton';
import {useAuth} from './contexts/AuthContext';
import Playlists from './components/Playlists';

function App(): React.JSX.Element {
  const isAuthenticated = useAuth();

  return (
    <>
      <Text style={styles.title}>SuperSetList</Text>
      <AuthButton />
      {isAuthenticated && <Playlists />}
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
