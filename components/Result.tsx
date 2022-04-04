import Image from 'next/image'
import type { Item } from '../types/result';
import styles from '../styles/result.module.css'

type Props = {
  result: any;
  error: any;
  loading: boolean;
  selectData: (item: Item) => void;
};

const Index: React.VFC<Props> = ({
  result,
  error,
  loading,
  selectData
}) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <Image src="/images/icon_loading.svg" alt="" width="38" height="38" />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.empty}>
        <p>エラーが発生しました</p>
      </div>
    );
  }
  if (result?.Items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>検索結果が見つかりません</p>
      </div>
    );
  }
  return (
    <ul className={styles.lists}>
      {result?.Items.map((item: Item) => (
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
  )
}

export default Index