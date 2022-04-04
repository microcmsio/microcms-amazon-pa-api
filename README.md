# microcms-amazon-pa-api

## 機能

- Amazon の書籍検索
- 商品を選択し、microCMS 側に保存

## 技術構成

- Next.js
- ESLint
- Prettier

## 環境変数

プロジェクトルートに`.env.local`ファイルを作成し、以下の項目を設定してください。

- ACCESS_KEY（Amazon Product Advertising API のアクセスキー）
- SECRET_KEY（Amazon Product Advertising API のシークレットキー）
- PARTNER_TAG（アソシエイトタグ）
- PARTNER_TYPE（パートナータイプ）
- MARKET_PLACE（マーケットプレイス）
- NEXT_PUBLIC_SERVICE_ID（連携する microCMS のサービス ID）

例：

```
ACCESS_KEY=xxxxxxxxxxxxxxxxxxxx
SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PARTNER_TAG=xxxxxxx-xx
PARTNER_TYPE=Associates
MARKET_PLACE=www.amazon.co.jp
NEXT_PUBLIC_SERVICE_ID=xxxxxxx
```

## 開発方法

```bash
# パッケージをインストール
$ npm install

# 開発サーバーを起動（localhost:3000）
$ npm run dev
```

microCMS の iFrame フィールドにて`http://localhost:3000`を指定することでデバッグ可能です。

## ライセンス

Apache License 2.0
