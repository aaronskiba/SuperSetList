import {useMemo} from 'react';
import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import Tracks from './Tracks';
import {useAuth} from '../contexts/AuthContext';
import {View, StyleSheet} from 'react-native';
import {getSharedTracks} from '../utils/trackUtils';
import PlaylistHeader from './headers/PlaylistHeader';
import CompareTracksHeader from './headers/CompareTracksHeader';
import ErrorMessage from './ErrorMessage';
import {useFetchTracks} from '../hooks/useFetchSpotify';

type SpotifyTracksComparisonProps = {
  selectedPlaylists: SpotifyPlaylist[];
};

export default function TracksComparison({
  selectedPlaylists,
}: SpotifyTracksComparisonProps) {
  const [leftPlaylist, rightPlaylist] = selectedPlaylists;
  const {auth} = useAuth();
  const accessToken = auth?.accessToken || '';

  const {data: leftTracks, error: leftError} = useFetchTracks(
    leftPlaylist.id,
    accessToken,
  );
  const {data: rightTracks, error: rightError} = useFetchTracks(
    rightPlaylist.id,
    accessToken,
  );

  const sharedTracks = useMemo(() => {
    if (!leftTracks || !rightTracks) return null;
    return getSharedTracks(leftTracks, rightTracks);
  }, [leftTracks, rightTracks]);

  return (
    <>
      <CompareTracksHeader spotifyPlaylists={selectedPlaylists} />
      {sharedTracks && <Tracks spotifyTracks={sharedTracks} />}
      <View style={styles.container}>
        <View style={styles.column}>
          <PlaylistHeader spotifyPlaylist={leftPlaylist} />
          <ErrorMessage error={leftError} />
          {leftTracks && <Tracks spotifyTracks={leftTracks} size={'small'} />}
        </View>
        <View style={styles.column}>
          <PlaylistHeader spotifyPlaylist={rightPlaylist} />
          <ErrorMessage error={rightError} />
          {rightTracks && <Tracks spotifyTracks={rightTracks} size={'small'} />}
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
