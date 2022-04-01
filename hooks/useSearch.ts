import { useCallback, useState } from 'react';
import type { Result } from '../types/result';

type UseSearch = (keywords?: string) => [Result | null, any, boolean, () => void];

export const useSearch: UseSearch = (keywords) => {
  const [result, setResult] = useState<[Result | null, any]>([null, null]);
  const [loading, setLoading] = useState<boolean>(false);

  const search = useCallback(() => {
    setLoading(true);
    fetch(`/api/search?keywords=${keywords}`)
      .then((res) => res.json())
      .then((data) => {
        setResult([data.SearchResult, null]);
        setLoading(false);
      })
      .catch((error) => {
        setResult([null, error]);
        setLoading(false);
      });
  }, [keywords]);

  return [...result, loading, search];
};
