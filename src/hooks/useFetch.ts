import {useState, useEffect} from 'react';

type FetchState<T> = {
  data: T | [];
  error: Error | null;
};

export function useFetch<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  deps: any[] = [],
) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: [],
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleFetch = async () => {
      setFetchState({data: [], error: null});
      try {
        const data = await fetchFn(signal);
        setFetchState({data, error: null});
      } catch (error: any) {
        if (signal.aborted) return;
        setFetchState({data: [], error});
      }
    };

    handleFetch();

    return () => {
      controller.abort();
    };
  }, deps);

  return fetchState;
}
