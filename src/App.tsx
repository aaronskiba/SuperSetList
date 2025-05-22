import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import SpotifyAuthButton from './components/SpotifyAuthButton';
import {SpotifyAuth} from './types/SpotifyAuth';
import {SpotifyPlaylist} from './types/SpotifyPlaylist';
import {getPlaylists} from './services/playlistService';
import Playlist from './components/SpotifyPlaylist';

function App(): React.JSX.Element {
  const [spotifyAuth, setSpotifyAuth] = useState<SpotifyAuth | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!spotifyAuth?.accessToken) {
        return;
      }
      const data = await getPlaylists(spotifyAuth.accessToken);
      setPlaylists(data);
    };
    if (spotifyAuth?.accessToken) {
      fetchPlaylists();
    } else {
      setPlaylists(null);
    }
  }, [spotifyAuth]);

  return (
    <>
      <Text style={styles.title}>SuperSetList</Text>
      <SpotifyAuthButton
        spotifyAuth={spotifyAuth}
        setSpotifyAuth={setSpotifyAuth}
      />
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
