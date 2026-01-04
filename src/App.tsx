import {useState} from 'react';
import AuthButton from './components/AuthButton';
import {useAuth} from './contexts/AuthContext';
import {SpotifyPlaylist} from './types/SpotifyPlaylist';
import Playlists from './components/Playlists';
import Tracks from './components/Tracks';
import TracksComparison from './components/TracksComparison';
import BackButton from './components/BackButton';

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

  const renderScreen = () => {
    if (focusedPlaylist) {
      return (
        <>
          <BackButton clearAllPlaylists={clearAllPlaylists} />
          <Tracks spotifyPlaylist={focusedPlaylist} />
        </>
      );
    }
    if (selectedPlaylists.length === 2) {
      return (
        <>
          <BackButton clearAllPlaylists={clearAllPlaylists} />
          <TracksComparison selectedPlaylists={selectedPlaylists} />
        </>
      );
    }
    return (
      <Playlists
        selectedPlaylists={selectedPlaylists}
        updateSelectedPlaylists={updateSelectedPlaylists}
        focusPlaylist={p => setFocusedPlaylist(p)}
      />
    );
  };

  return (
    <>
      {isAuthenticated && renderScreen()}
      <AuthButton clearAllPlaylists={clearAllPlaylists} />
    </>
  );
}

export default App;
