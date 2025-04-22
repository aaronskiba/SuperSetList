import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import SpotifyAuthButton from './components/SpotifyAuthButton';
import {SpotifyAuth} from './types/SpotifyAuth';

function App(): React.JSX.Element {
  const [spotifyAuth, setSpotifyAuth] = useState<SpotifyAuth | null>(null);

  return (
    <>
      <Text style={styles.title}>SuperSetList</Text>
      <SpotifyAuthButton
        spotifyAuth={spotifyAuth}
        setSpotifyAuth={setSpotifyAuth}
      />
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
