import {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import AuthButton from './components/AuthButton';
import {useAuth} from './contexts/AuthContext';
import {SpotifyPlaylist} from './types/SpotifyPlaylist';
import Playlists from './components/Playlists';
import SpotifyTracks from './components/SpotifyTracks';

function App(): React.JSX.Element {
  const isAuthenticated = useAuth();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);

  return (
    <>
      <Text style={styles.title}>SuperSetList</Text>
      {isAuthenticated &&
        (playlist ? (
          <SpotifyTracks
            spotifyPlaylist={playlist}
            unselectPlaylist={() => setPlaylist(null)}
          />
        ) : (
          <Playlists selectPlaylist={(p: SpotifyPlaylist) => setPlaylist(p)} />
        ))}
      <AuthButton />
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
