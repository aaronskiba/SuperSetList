import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {useAuth} from '../contexts/AuthContext';
import Tracks from './Tracks';
import {View, StyleSheet} from 'react-native';
import PlaylistHeader from './headers/PlaylistHeader';
import ErrorMessage from './ErrorMessage';
import {useFetchTracks} from '../hooks/useFetchSpotify';
import Loader from './Loader';

type PlaylistTracksProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export default function PlaylistTracks({spotifyPlaylist}: PlaylistTracksProps) {
  const {accessToken} = useAuth();
  const {
    data: tracks,
    error,
    isLoading,
  } = useFetchTracks(spotifyPlaylist.id, accessToken);

  return (
    <View style={styles.column}>
      <PlaylistHeader spotifyPlaylist={spotifyPlaylist} />
      <Loader isLoading={isLoading} />
      <ErrorMessage error={error} />
      {tracks && <Tracks spotifyTracks={tracks} />}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
});
