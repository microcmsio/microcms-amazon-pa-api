import { useCallback, useEffect, useState } from 'react';
import { microcmsPostData, microcmsUpdateStyle } from '../lib/microcms';
import type { Item } from '../types/result';

type UseMicrocms = () => [Item | undefined, (item: Item) => void];

export const useMicrocms: UseMicrocms = () => {
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<Item>();

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (
        e.isTrusted === true &&
        e.data.action === 'MICROCMS_GET_DEFAULT_DATA'
      ) {
        setId(e.data.id);
        setData(e.data.message?.data);
        microcmsUpdateStyle({
          id: e.data.id,
          message: {
            height: 400,
          },
        });
      }
    });
  }, []);

  const selectData = useCallback(
    (item: Item) => {
      setData(item);
      microcmsPostData({
        id,
        message: {
          id: item.ASIN,
          title: item.ItemInfo.Title.DisplayValue,
          imageUrl: item.Images.Primary.Large.URL,
          updatedAt: new Date(),
          data: item,
        },
      });
    },
    [id]
  );

  return [data, selectData];
};
