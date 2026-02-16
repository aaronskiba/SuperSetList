import {useMemo} from 'react';
import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import Tracks from './Tracks';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import {View, StyleSheet} from 'react-native';
import {getSharedTracks} from '../utils/trackUtils';
import PlaylistHeader from './headers/PlaylistHeader';
import CompareTracksHeader from './headers/CompareTracksHeader';
import {useFetch} from '../hooks/useFetch';

type SpotifyTracksComparisonProps = {
  selectedPlaylists: SpotifyPlaylist[];
};

export default function TracksComparison({
  selectedPlaylists,
}: SpotifyTracksComparisonProps) {
  const [leftPlaylist, rightPlaylist] = selectedPlaylists;
  const {auth} = useAuth();
  const accessToken = auth?.accessToken || '';

  const {data: leftTracks} = useFetch<SpotifyTrack[]>(
    signal => getPlaylistTracks(leftPlaylist.id, accessToken, signal),
    [accessToken, leftPlaylist.id],
  );

  const {data: rightTracks} = useFetch<SpotifyTrack[]>(
    signal => getPlaylistTracks(rightPlaylist.id, accessToken, signal),
    [accessToken, rightPlaylist.id],
  );

  const sharedTracks = useMemo(
    () => getSharedTracks(leftTracks, rightTracks),
    [leftTracks, rightTracks],
  );

  return (
    <>
      <CompareTracksHeader spotifyPlaylists={selectedPlaylists} />
      <Tracks spotifyTracks={sharedTracks} />
      <View style={styles.container}>
        <View style={styles.column}>
          <PlaylistHeader spotifyPlaylist={leftPlaylist} />
          <Tracks spotifyTracks={leftTracks} size={'small'} />
        </View>
        <View style={styles.column}>
          <PlaylistHeader spotifyPlaylist={rightPlaylist} />
          <Tracks spotifyTracks={rightTracks} size={'small'} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  column: {
    flex: 1,
  },
});
