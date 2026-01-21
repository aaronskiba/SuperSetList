import {useEffect, useState} from 'react';
import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import Tracks from './Tracks';
import {View, StyleSheet} from 'react-native';
import PlaylistHeader from './headers/PlaylistHeader';

type PlaylistTracksProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export default function PlaylistTracks({spotifyPlaylist}: PlaylistTracksProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const {auth} = useAuth();
  const accessToken = auth?.accessToken;

  useEffect(() => {
    if (!spotifyPlaylist || !accessToken) return;

    getPlaylistTracks(spotifyPlaylist.id, accessToken).then(setTracks);
  }, [accessToken]);

  return (
    <View style={styles.column}>
      <PlaylistHeader spotifyPlaylist={spotifyPlaylist} />
      <Tracks spotifyTracks={tracks} />
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
});
