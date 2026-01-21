import {useEffect, useState} from 'react';
import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {SpotifyPlaylistsProps} from '../types/SpotifyPlaylistProps';
import {getPlaylists} from '../services/playlistService';
import Playlist from './Playlist';
import Header from './headers/Header';
import {useAuth} from '../contexts/AuthContext';
import {FlatList} from 'react-native';

export default function Playlists({
  selectedPlaylists,
  updateSelectedPlaylists,
  focusPlaylist,
}: SpotifyPlaylistsProps) {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);
  const {auth} = useAuth();
  const accessToken = auth?.accessToken;

  useEffect(() => {
    if (!accessToken) {
      setPlaylists(null);
      return;
    }
    getPlaylists(accessToken).then(setPlaylists);
  }, [accessToken]);

  return (
    <>
      <Header title={'All Playlists'} images={[]} />
      <FlatList
        data={playlists}
        renderItem={({item}) => (
          <Playlist
            spotifyPlaylist={item}
            isSelected={!!selectedPlaylists.some(p => p.id === item.id)}
            updateSelectedPlaylists={updateSelectedPlaylists}
            focusPlaylist={focusPlaylist}
          />
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
}
