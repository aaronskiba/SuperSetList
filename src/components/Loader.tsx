import {ActivityIndicator} from 'react-native';
import {SPOTIFY_GREEN} from '../theme/colors';

type LoaderProps = {
  isLoading: boolean;
  size?: 'small' | 'large';
};

export default function Loader({isLoading, size = 'large'}: LoaderProps) {
  return (
    <>{isLoading && <ActivityIndicator size={size} color={SPOTIFY_GREEN} />}</>
  );
}
