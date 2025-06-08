import {useEffect, useState} from 'react';
import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {SpotifyPlaylistsProps} from '../types/SpotifyPlaylistProps';
import {getPlaylists} from '../services/playlistService';
import Playlist from './Playlist';
import {useAuth} from '../contexts/AuthContext';

export default function Playlists({selectPlaylist}: SpotifyPlaylistsProps) {
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
        playlists.map(playlist => {
          return (
            <Playlist
              key={playlist.id}
              spotifyPlaylist={playlist}
              selectPlaylist={selectPlaylist}
            />
          );
        })}
    </>
  );
}
