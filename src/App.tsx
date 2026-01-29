import {useState} from 'react';
import AuthButton from './components/AuthButton';
import {useAuth} from './contexts/AuthContext';
import {SpotifyPlaylist} from './types/SpotifyPlaylist';
import Playlists from './components/Playlists';
import PlaylistTracks from './components/PlaylistTracks';
import CompareTracks from './components/CompareTracks';
import BackToPlaylistsButton from './components/BackToPlaylistsButton';
import Header from './components/headers/Header';

type Screen = 'playlists' | 'tracks' | 'compare';

function App(): React.JSX.Element {
  const isAuthenticated = useAuth();
  const [selectedPlaylists, setSelectedPlaylists] = useState<SpotifyPlaylist[]>(
    [],
  );
  const [focusedPlaylist, setFocusedPlaylist] =
    useState<SpotifyPlaylist | null>(null);
  const screen: Screen = focusedPlaylist
    ? 'tracks'
    : selectedPlaylists.length === 2
    ? 'compare'
    : 'playlists';

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
        // screen === 'tracks' implies focusedPlaylist !== null
        return <PlaylistTracks spotifyPlaylist={focusedPlaylist!} />;
      case 'compare':
        return <CompareTracks selectedPlaylists={selectedPlaylists} />;
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
      <Header title={'SuperSetlist'} images={[]} />
      {isAuthenticated && screen !== 'playlists' && (
        <BackToPlaylistsButton clearAllPlaylists={clearAllPlaylists} />
      )}
      {isAuthenticated && renderScreen()}
      <AuthButton clearAllPlaylists={clearAllPlaylists} />
    </>
  );
}

export default App;
