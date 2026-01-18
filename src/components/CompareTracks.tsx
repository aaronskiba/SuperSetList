import {useState, useEffect, useMemo} from 'react';
import {SpotifyTrack} from '../types/SpotifyPlaylist';
import Tracks from './Tracks';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import {SpotifyTracksComparisonProps} from '../types/SpotifyPlaylistProps';
import {View, StyleSheet} from 'react-native';
import {getSharedTracks} from '../utils/trackUtils';

export default function TracksComparison({
  selectedPlaylists,
}: SpotifyTracksComparisonProps) {
  const [leftPlaylist, rightPlaylist] = selectedPlaylists;
  const [leftTracks, setLeftTracks] = useState<SpotifyTrack[]>([]);
  const [rightTracks, setRightTracks] = useState<SpotifyTrack[]>([]);
  const {auth} = useAuth();
  const accessToken = auth?.accessToken;

  const sharedTracks = useMemo(
    () => getSharedTracks(leftTracks, rightTracks),
    [leftTracks, rightTracks],
  );

  useEffect(() => {
    if (!accessToken) {
      setLeftTracks([]);
      setRightTracks([]);
      return;
    }
    getPlaylistTracks(leftPlaylist.id, accessToken).then(setLeftTracks);
    getPlaylistTracks(rightPlaylist.id, accessToken).then(setRightTracks);
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <Tracks
        spotifyTracks={leftTracks}
        spotifyPlaylist={leftPlaylist}
        size={'small'}
      />
      <Tracks
        spotifyTracks={rightTracks}
        spotifyPlaylist={rightPlaylist}
        size={'small'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});
