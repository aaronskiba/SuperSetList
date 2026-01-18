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
    if (!accessToken || !leftPlaylist || !rightPlaylist) {
      setLeftTracks([]);
      setRightTracks([]);
      return;
    }
    Promise.all([
      getPlaylistTracks(leftPlaylist.id, accessToken),
      getPlaylistTracks(rightPlaylist.id, accessToken),
    ])
      .then(([lData, rData]) => {
        setLeftTracks(lData);
        setRightTracks(rData);
      })
      .catch(console.error);
  }, [accessToken, leftPlaylist.id, rightPlaylist.id]);

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
