import { useCallback, useState } from 'react';
import type { Result } from '../types/result';

type UseSearch = (keywords?: string) => [Result | null, any, boolean, () => void];

export const useSearch: UseSearch = (keywords) => {
  const [result, setResult] = useState<[Result | null, any, boolean]>([null, null, true]);

  const search = useCallback(() => {
    fetch(`/api/search?keywords=${keywords}`)
      .then((res) => res.json())
      .then((data) => setResult([data.SearchResult, null, false]))
      .catch((error) => setResult([null, error, false]));
  }, [keywords]);

  return [...result, search];
};
