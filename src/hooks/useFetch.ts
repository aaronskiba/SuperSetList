import {useState, useEffect} from 'react';

type FetchState<T> = {
  data: T | [];
  error: Error | null;
};

export function useFetch<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: [],
    error: null,
  });

  useEffect(() => {
    const handleFetch = async () => {
      setFetchState({data: [], error: null});
      try {
        const data = await fetchFn();
        setFetchState({data, error: null});
      } catch (error: any) {
        setFetchState({data: [], error});
      }
    };

    handleFetch();
  }, deps);

  return fetchState;
}
