import {useState, useEffect} from 'react';
import {useAuth} from '../contexts/AuthContext';

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

export function useFetch<T>(
  fetchFn: (accessToken: string, signal: AbortSignal) => Promise<T>,
  deps: any[] = [],
) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });
  const {isAuthenticated, getValidAccessToken} = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleFetch = async () => {
      setFetchState({data: null, error: null, isLoading: true});
      try {
        const accessToken = await getValidAccessToken();
        if (!accessToken) {
          setFetchState({data: null, error: null, isLoading: false});
          return;
        }
        const data = await fetchFn(accessToken, signal);
        setFetchState({data, error: null, isLoading: false});
      } catch (error: any) {
        if (signal.aborted) return;
        setFetchState({data: null, error, isLoading: false});
      }
    };

    if (!isAuthenticated) {
      setFetchState({data: null, error: null, isLoading: false});
      return () => controller.abort();
    }

    handleFetch();

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, ...deps]);

  return fetchState;
}
