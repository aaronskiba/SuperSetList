import {useState, useEffect} from 'react';

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

export function useFetch<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  deps: any[] = [],
) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleFetch = async () => {
      setFetchState({data: null, error: null, isLoading: true});
      try {
        const data = await fetchFn(signal);
        setFetchState({data, error: null, isLoading: false});
      } catch (error: any) {
        if (signal.aborted) return;
        setFetchState({data: null, error, isLoading: false});
      }
    };

    handleFetch();

    return () => {
      controller.abort();
    };
  }, deps);

  return fetchState;
}
