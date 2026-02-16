import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {useAuth} from '../contexts/AuthContext';
import Tracks from './Tracks';
import {View, StyleSheet} from 'react-native';
import PlaylistHeader from './headers/PlaylistHeader';
import ErrorMessage from './ErrorMessage';
import {useFetchTracks} from '../hooks/useFetchSpotify';

type PlaylistTracksProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export default function PlaylistTracks({spotifyPlaylist}: PlaylistTracksProps) {
  const {auth} = useAuth();
  const accessToken = auth?.accessToken || '';
  const {data: tracks, error} = useFetchTracks(spotifyPlaylist.id, accessToken);

  return (
    <View style={styles.column}>
      <PlaylistHeader spotifyPlaylist={spotifyPlaylist} />
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
