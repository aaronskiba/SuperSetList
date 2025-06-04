import {useEffect, useState} from 'react';
import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {getPlaylists} from '../services/playlistService';
import PlaylistItem from './PlaylistItem';
import {useAuth} from '../contexts/AuthContext';

export default function PlaylistList() {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);
  const {auth, isAuthenticated} = useAuth();

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!isAuthenticated) {
        return;
      }
      const data = await getPlaylists(auth!.accessToken);
      setPlaylists(data);
    };
    if (isAuthenticated) {
      fetchPlaylists();
    } else {
      setPlaylists(null);
    }
  }, [auth, isAuthenticated]);

  return (
    <>
      {playlists &&
        playlists.map((playlist, playlistIdx) => {
          return <PlaylistItem key={playlistIdx} spotifyPlaylist={playlist} />;
        })}
    </>
  );
}
