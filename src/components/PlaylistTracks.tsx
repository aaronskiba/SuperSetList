import {useEffect, useState} from 'react';
import {SpotifyPlaylist, SpotifyTrack} from '../types/SpotifyPlaylist';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import Tracks from './Tracks';

type PlaylistTracksProps = {
  spotifyPlaylist: SpotifyPlaylist;
};

export default function PlaylistTracks({spotifyPlaylist}: PlaylistTracksProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const {auth} = useAuth();
  const accessToken = auth?.accessToken;

  useEffect(() => {
    if (!accessToken || !spotifyPlaylist) return;

    getPlaylistTracks(spotifyPlaylist.id, accessToken)
      .then(setTracks)
      .catch(console.error);
  }, [accessToken, spotifyPlaylist.id]);

  return <Tracks spotifyPlaylist={spotifyPlaylist} spotifyTracks={tracks} />;
}
