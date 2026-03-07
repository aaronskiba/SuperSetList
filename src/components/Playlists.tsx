import {SpotifyPlaylist} from '../types/SpotifyPlaylist';
import {SpotifyPlaylistActions} from '../types/SpotifyPlaylistProps';
import Playlist from './Playlist';
import Header from './headers/Header';
import {FlatList} from 'react-native';
import ErrorMessage from './ErrorMessage';
import {useFetchPlaylists} from '../hooks/useFetchSpotify';
import Loader from './Loader';

type SpotifyPlaylistsProps = SpotifyPlaylistActions & {
  selectedPlaylists: SpotifyPlaylist[];
};

export default function Playlists({
  selectedPlaylists,
  updateSelectedPlaylists,
  focusPlaylist,
}: SpotifyPlaylistsProps) {
  const {data: playlists, error, isLoading} = useFetchPlaylists();

  return (
    <>
      <Header title={'All Playlists'} images={[]} />
      <Loader isLoading={isLoading} />
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
