import {useState, useEffect} from 'react';
import AuthButton from './components/AuthButton';
import {useAuth} from './contexts/AuthContext';
import {SpotifyPlaylist} from './types/SpotifyPlaylist';
import Playlists from './components/Playlists';
import Tracks from './components/Tracks';
import TracksComparison from './components/TracksComparison';
import BackToPlaylistsButton from './components/BackToPlaylistsButton';

type Screen = 'playlists' | 'tracks' | 'compare';

function App(): React.JSX.Element {
  const isAuthenticated = useAuth();
  const [screen, setScreen] = useState<Screen>('playlists');
  const [selectedPlaylists, setSelectedPlaylists] = useState<SpotifyPlaylist[]>(
    [],
  );
  const [focusedPlaylist, setFocusedPlaylist] =
    useState<SpotifyPlaylist | null>(null);

  useEffect(() => {
    if (focusedPlaylist) {
      setScreen('tracks');
    } else if (selectedPlaylists.length === 2) {
      setScreen('compare');
    } else {
      setScreen('playlists');
    }
  }, [focusedPlaylist, selectedPlaylists]);

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

  const renderScreen = () => {
    switch (screen) {
      case 'tracks':
        return <Tracks spotifyPlaylist={focusedPlaylist!} />;
      case 'compare':
        return <TracksComparison selectedPlaylists={selectedPlaylists} />;
      case 'playlists':
      default:
        return (
          <Playlists
            selectedPlaylists={selectedPlaylists}
            updateSelectedPlaylists={updateSelectedPlaylists}
            focusPlaylist={p => setFocusedPlaylist(p)}
          />
        );
    }
  };

  return (
    <>
      {isAuthenticated && screen !== 'playlists' && (
        <BackToPlaylistsButton clearAllPlaylists={clearAllPlaylists} />
      )}
      {isAuthenticated && renderScreen()}
      <AuthButton clearAllPlaylists={clearAllPlaylists} />
    </>
  );
}

export default App;
