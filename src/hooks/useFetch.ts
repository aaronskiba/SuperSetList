import {useState, useEffect} from 'react';

type FetchState<T> = {
  data: T | null;
  error: Error | null;
};

export function useFetch<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  deps: any[] = [],
) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleFetch = async () => {
      setFetchState({data: null, error: null});
      try {
        const data = await fetchFn(signal);
        setFetchState({data, error: null});
      } catch (error: any) {
        if (signal.aborted) return;
        setFetchState({data: null, error});
      }
    };

    handleFetch();

    return () => {
      controller.abort();
    };
  }, deps);

  return fetchState;
}
