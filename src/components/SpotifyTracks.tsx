import {useEffect, useState} from 'react';
import {SpotifyTrack} from '../types/SpotifyPlaylist';
import Track from './Track';
import {SpotifyTracksProps} from '../types/SpotifyPlaylistProps';
import {getPlaylistTracks} from '../services/trackService';
import {useAuth} from '../contexts/AuthContext';
import BackButton from './BackButton';

export default function SpotifyTracks({
  spotifyPlaylist,
  unselectPlaylist,
}: SpotifyTracksProps) {
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
    <>
      <BackButton unselectPlaylist={unselectPlaylist} />
      {tracks &&
        tracks.map(track => {
          return <Track key={track.id} spotifyTrack={track} />;
        })}
    </>
  );
}
