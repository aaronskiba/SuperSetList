import {useMemo} from 'react';
import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import Tracks from './Tracks';
import {View, StyleSheet} from 'react-native';
import {getSharedTracks} from '../utils/trackUtils';
import PlaylistHeader from './headers/PlaylistHeader';
import CompareTracksHeader from './headers/CompareTracksHeader';
import ErrorMessage from './ErrorMessage';
import {useFetchTracks} from '../hooks/useFetchSpotify';
import Loader from './Loader';

type SpotifyTracksComparisonProps = {
  selectedPlaylists: SpotifyPlaylist[];
};

export default function TracksComparison({
  selectedPlaylists,
}: SpotifyTracksComparisonProps) {
  const [leftPlaylist, rightPlaylist] = selectedPlaylists;

  const {
    data: leftTracks,
    error: leftError,
    isLoading: leftIsLoading,
  } = useFetchTracks(leftPlaylist.id);
  const {
    data: rightTracks,
    error: rightError,
    isLoading: rightIsLoading,
  } = useFetchTracks(rightPlaylist.id);

  const sharedTracks = useMemo(() => {
    if (!leftTracks || !rightTracks) return null;
    return getSharedTracks(leftTracks, rightTracks);
  }, [leftTracks, rightTracks]);

  const renderCompareTracksColumn = (
    playlist: SpotifyPlaylist,
    tracks: SpotifyTrack[] | null,
    error: Error | null,
    isLoading: boolean,
  ) => (
    <View style={styles.column}>
      <PlaylistHeader spotifyPlaylist={playlist} />
      <Loader isLoading={isLoading} />
      <ErrorMessage error={error} />
      {tracks && <Tracks spotifyTracks={tracks} size={'small'} />}
    </View>
  );

  return (
    <>
      <CompareTracksHeader spotifyPlaylists={selectedPlaylists} />
      <Loader isLoading={leftIsLoading || rightIsLoading} />
      {sharedTracks && <Tracks spotifyTracks={sharedTracks} />}
      <View style={styles.container}>
        {renderCompareTracksColumn(
          leftPlaylist,
          leftTracks,
          leftError,
          leftIsLoading,
        )}
        {renderCompareTracksColumn(
          rightPlaylist,
          rightTracks,
          rightError,
          rightIsLoading,
        )}
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
