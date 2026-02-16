import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import Tracks from './Tracks';
import {View, StyleSheet} from 'react-native';
import PlaylistHeader from './headers/PlaylistHeader';
import {useFetch} from '../hooks/useFetch';
import ErrorMessage from './ErrorMessage';

type PlaylistTracksProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export default function PlaylistTracks({spotifyPlaylist}: PlaylistTracksProps) {
  const {auth} = useAuth();
  const accessToken = auth?.accessToken || '';

  const {data: tracks, error} = useFetch<SpotifyTrack[]>(
    signal => getPlaylistTracks(spotifyPlaylist.id, accessToken, signal),
    [accessToken, spotifyPlaylist.id],
  );

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
