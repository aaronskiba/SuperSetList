import {useState, useEffect, useMemo} from 'react';
import {SpotifyTrack} from '../types/SpotifyPlaylist';
import Tracks from './Tracks';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import {SpotifyTracksComparisonProps} from '../types/SpotifyPlaylistProps';
import {View, StyleSheet} from 'react-native';
import {getSharedTracks} from '../utils/trackUtils';
import PlaylistHeader from './headers/PlaylistHeader';
import CompareTracksHeader from './headers/CompareTracksHeader';

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
