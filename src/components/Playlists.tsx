import {useEffect, useState} from 'react';
import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {getPlaylists} from '../services/playlistService';
import Playlist from './Playlist';
import {useAuth} from '../contexts/AuthContext';

export default function Playlists() {
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
          return <Playlist key={playlistIdx} spotifyPlaylist={playlist} />;
        })}
    </>
  );
}
