# TAISA Mirror 公式サイト（超入門）

Official download and beginner-friendly setup guide for **TAISA Mirror**.
TAISA Mirror 本体: https://github.com/jpn-x/taisa-mirror

- 役割: このリポジトリ＝ダウンロード・使い方・FAQの**公式サイト**（本体のコードは `jpn-x/taisa-mirror`）
- 公開: **Cloudflare Workers Static Assets**（Worker名 `taisa-mirror`）。静的HTML/CSS/JSのみ。DB・API・ログインなし。
- デザイン: 「ShareX超入門」と同じシリーズの型（読み取り専用の見本。元サイトは変更していません）。

## 構成
```
public/            ← 公開されるファイルだけ（Workersにアップロードされる）
  index.html  style.css  script.js
  config.js        ★新バージョンが出たらここだけ変える
  images/          logo / og-image / favicon / steps(説明画像)
wrangler.jsonc     Workers Static Assets の設定（directory = ./public）
tools/             make-images.ps1(OGP等の作成) / check-links.js(全リンク確認)
serve.js           ローカル確認用（node serve.js → http://localhost:8765）
```

## TAISA Mirror が新しくなったとき（v0.1.4 など）
`public/config.js` の **3つだけ**を書き換える:
```js
version: '0.1.4',
downloadUrl: 'https://github.com/jpn-x/taisa-mirror/releases/download/v0.1.4/taisa-mirror-v0.1.4-win-x64.zip',
sha256: '（新しいZIPのSHA256。Releaseの SHA256SUMS.txt を見る）',
```
→ `node tools/check-links.js` で確認 → `git commit && git push` → `npx wrangler deploy`（下記）。
HTML/CSS は触りません。

## デプロイ（手動 wrangler）
```
npx wrangler deploy          # Cloudflare にログイン済み（CLOUDFLARE_API_TOKEN）のPCで
```
公開URL: https://taisa-mirror.cadillac600.workers.dev
（`*.workers.dev` はCloudflareアカウントの内部名です。将来、独自ドメインを付ける場合は Workers の Custom Domain を使います。）

## 画像を差し替える
`public/images/steps/` の説明画像（今はイラストSVG。`step3-chrome.png` だけ実画面）を、実際のスクリーンショットに差し替えます。
同じファイル名で置くか、`index.html` の `src` を変えるだけです。OGP等は `tools/make-images.ps1` で再作成できます。

## ローカル確認
```
node serve.js
node tools/check-links.js              # リンク確認
node tools/check-links.js https://taisa-mirror.cadillac600.workers.dev   # 公開後の確認
```
