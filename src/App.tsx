import {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import AuthButton from './components/AuthButton';
import {useAuth} from './contexts/AuthContext';
import {SpotifyPlaylist} from './types/SpotifyPlaylist';
import Playlists from './components/Playlists';
import Tracks from './components/Tracks';

function App(): React.JSX.Element {
  const isAuthenticated = useAuth();
  const [selectedPlaylists, setSelectedPlaylists] = useState<SpotifyPlaylist[]>(
    [],
  );
  const [focusedPlaylist, setFocusedPlaylist] =
    useState<SpotifyPlaylist | null>(null);

  const clearAllPlaylists = () => {
    setSelectedPlaylists([]);
    setFocusedPlaylist(null);
  };

  const updateSelectedPlaylists = (playlist: SpotifyPlaylist) => {
    setSelectedPlaylists(prev => {
      // if a previously selected playlist is being unselected
      if (prev.some(p => p.id === playlist.id))
        return prev.filter(p => p.id !== playlist.id);
      // Don't allow for more than two selectedPlaylists
      if (prev.length >= 2) return prev;
      return [...prev, playlist];
    });
  };

  const tracksOrPlaylists = () => {
    // If a playlist is "focused", return <Tracks>; otherwise, return <Playlists>
    return focusedPlaylist ? (
      <Tracks
        spotifyPlaylist={focusedPlaylist}
        unfocusPlaylist={() => setFocusedPlaylist(null)}
      />
    ) : (
      <Playlists
        selectedPlaylists={selectedPlaylists}
        updateSelectedPlaylists={updateSelectedPlaylists}
        focusPlaylist={p => setFocusedPlaylist(p)}
      />
    );
  };

  return (
    <>
      <Text style={styles.title}>
        {focusedPlaylist ? `${focusedPlaylist.name} Tracks` : 'All Playlists'}
      </Text>
      {isAuthenticated && tracksOrPlaylists()}
      <AuthButton clearAllPlaylists={clearAllPlaylists} />
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
});

export default App;
