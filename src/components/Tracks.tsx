import {useEffect, useState} from 'react';
import {SpotifyTrack} from '../types/SpotifyPlaylist';
import Track from './Track';
import {SpotifyTracksProps} from '../types/SpotifyPlaylistProps';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import ListHeader from './ListHeader';
import {View, StyleSheet} from 'react-native';

export default function Tracks({spotifyPlaylist}: SpotifyTracksProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
  const {auth} = useAuth();
  const accessToken = auth?.accessToken;
  useEffect(() => {
    const fetchTracks = async () => {
      if (!accessToken) {
        setTracks(null);
        return;
      }
      const data = await getPlaylistTracks(spotifyPlaylist.id, accessToken);
      setTracks(data);
    };
    fetchTracks();
  }, [accessToken]);

  return (
    <View style={styles.column}>
      <ListHeader spotifyPlaylist={spotifyPlaylist} />
      {tracks &&
        tracks.map(track => {
          return <Track key={track.id} spotifyTrack={track} />;
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
});
