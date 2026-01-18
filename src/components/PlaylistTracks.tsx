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
    if (!spotifyPlaylist || !accessToken) return;

    getPlaylistTracks(spotifyPlaylist.id, accessToken).then(setTracks);
  }, [accessToken]);

  return <Tracks spotifyPlaylist={spotifyPlaylist} spotifyTracks={tracks} />;
}
