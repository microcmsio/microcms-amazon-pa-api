import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useCallback, useState } from 'react'
import { useSearch } from '../hooks/useSearch'
import type { Item } from '../types/result';
import styles from '../styles/index.module.css'

const Index: NextPage = () => {
  const [id, setId] = useState();
  const [data, setData] = useState<Item>();

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (
        e.isTrusted === true &&
        e.data.action === 'MICROCMS_GET_DEFAULT_DATA'
      ) {
        setId(e.data.id);
        setData(e.data.message?.data);
        window.parent.postMessage(
          {
            id: e.data.id,
            action: 'MICROCMS_UPDATE_STYLE',
            message: {
              height: 400,
            }
          },
          `https://${process.env.NEXT_PUBLIC_SERVICE_ID}.microcms.io`
        );
      }
    });
  }, []);

  const [query, setQuery] = useState<string>('');
  const [result, error, loading, search] = useSearch(query);

  const selectData = useCallback((item) => {
    setData(item);
    window.parent.postMessage(
      {
        id,  // iFrame識別子
        action: 'MICROCMS_POST_DATA',
        message: {
          id: item.ASIN,
          title: item.ItemInfo.Title.DisplayValue,
          imageUrl: item.Images.Primary.Large.URL,
          updatedAt: new Date(),
          data: item
        }
      },
      `https://${process.env.NEXT_PUBLIC_SERVICE_ID}.microcms.io`
    );
  }, [id]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        search();
      }
    },
    [search]
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.selected}>
          {
            data ?
              <div className={styles.selectedImage}>
                <Image
                  src={data.Images.Primary.Large.URL}
                  alt=""
                  width={data.Images.Primary.Large.Width}
                  height={data.Images.Primary.Large.Height}
                />
                <p>{data.ItemInfo.Title.DisplayValue}</p>
              </div>
              :
              <p>選択中のアイテムがありません</p>
          }
        </div>
        <div className={styles.search}>
          <div className={styles.form}>
            <input type="text" onChange={(e) => setQuery(e.target.value)} onKeyDown={onKeyDown} className={styles.input} />
            <button onClick={search} className={styles.button}>検索</button>
          </div>
          <div className={styles.result}>
            {
              loading ?
                <div className={styles.loading}>
                  <Image src="/images/icon_loading.svg" alt="" width="38" height="38" />
                </div>
                :
                result?.Items.length === 0 ?
                <div className={styles.empty}>
                  <p>検索結果が見つかりません</p>
                </div>
                :
                <ul className={styles.lists}>
                  {result?.Items.map((item) => (
                    <li key={item.ASIN} className={styles.list} onClick={() => selectData(item)}>
                      <div className={styles.image}>
                        <Image
                          src={item.Images.Primary.Large.URL}
                          alt=""
                          width={item.Images.Primary.Large.Width}
                          height={item.Images.Primary.Large.Height}
                        />
                      </div>
                      <div>
                        <p>{item.ItemInfo.Title.DisplayValue}</p>
                        <ul className={styles.contributors}>
                          {item.ItemInfo.ByLineInfo.Contributors?.map((contributor, i) => (
                            <li key={i}>
                              {contributor.Name}
                              （{contributor.Role}）
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index