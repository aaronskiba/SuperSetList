import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {SpotifyPlaylistActions} from '../types/SpotifyPlaylistProps';
import {getPlaylists} from '../services/playlistService';
import Playlist from './Playlist';
import Header from './headers/Header';
import {useAuth} from '../contexts/AuthContext';
import {FlatList} from 'react-native';
import {useFetch} from '../hooks/useFetch';
import ErrorMessage from './ErrorMessage';

type SpotifyPlaylistsProps = SpotifyPlaylistActions & {
  selectedPlaylists: SpotifyPlaylist[];
};

export default function Playlists({
  selectedPlaylists,
  updateSelectedPlaylists,
  focusPlaylist,
}: SpotifyPlaylistsProps) {
  const {auth} = useAuth();
  const accessToken = auth?.accessToken || '';

  const {data: playlists, error} = useFetch<SpotifyPlaylist[]>(
    signal => getPlaylists(accessToken, signal),
    [accessToken],
  );

  return (
    <>
      <Header title={'All Playlists'} images={[]} />
      <ErrorMessage error={error} />
      {playlists && (
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
      )}
    </>
  );
}
