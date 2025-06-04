import {useEffect, useState} from 'react';
import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {getPlaylists} from '../services/playlistService';
import PlaylistItem from './PlaylistItem';
import {useAuth} from '../contexts/AuthContext';

export default function PlaylistList() {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);
  const {auth} = useAuth();
  const accessToken = auth?.accessToken;

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!accessToken) {
        setPlaylists(null);
        return;
      }
      const data = await getPlaylists(accessToken);
      setPlaylists(data);
    };
    fetchPlaylists();
  }, [accessToken]);

  return (
    <>
      {playlists &&
        playlists.map((playlist, playlistIdx) => {
          return <PlaylistItem key={playlistIdx} spotifyPlaylist={playlist} />;
        })}
    </>
  );
}
