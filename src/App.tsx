import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import SpotifyAuthButton from './components/SpotifyAuthButton';
import {useAuth} from './contexts/AuthContext';
import {SpotifyPlaylist} from './types/SpotifyPlaylist';
import {getPlaylists} from './services/playlistService';
import Playlist from './components/SpotifyPlaylist';

function App(): React.JSX.Element {
  const {auth, isAuthenticated} = useAuth();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!isAuthenticated) {
        return;
      }
      const data = await getPlaylists(auth!.accessToken);
      setPlaylists(data);
    };
    if (isAuthenticated) {
      fetchPlaylists();
    } else {
      setPlaylists(null);
    }
  }, [auth, isAuthenticated]);

  return (
    <>
      <Text style={styles.title}>SuperSetList</Text>
      <SpotifyAuthButton />
      {playlists &&
        playlists.map((playlist, playlistIdx) => {
          return (
            <Playlist key={playlistIdx} spotifyPlaylist={playlist}></Playlist>
          );
        })}
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
