# MirrorX 公式サイト（超入門）

開発コードネーム：**TAISA MIRROR**（Development codename: TAISA MIRROR）

Official download and beginner-friendly setup guide for **MirrorX**.
MirrorX 本体（リポジトリ名は開発コードネームのまま `taisa-mirror`）: https://github.com/jpn-x/taisa-mirror

- 役割: このリポジトリ＝ダウンロード・使い方・FAQの**公式サイト**（本体のコードは `jpn-x/taisa-mirror`）
- 公開: **Cloudflare Workers Static Assets**（Worker名 `mirrorx`）。静的HTML/CSS/JSのみ。DB・API・ログインなし。
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

## MirrorX が新しくなったとき（v0.1.4 など）
`public/config.js` の **3つだけ**を書き換える:
```js
version: '0.2.0',
downloadUrl: 'https://github.com/jpn-x/taisa-mirror/releases/download/v0.2.0/mirrorx-v0.2.0-win-x64.zip',
sha256: '（新しいZIPのSHA256。Releaseの SHA256SUMS.txt を見る）',
```
→ `node tools/check-links.js` で確認 → `git commit && git push` → `npx wrangler deploy`（下記）。
HTML/CSS は触りません。

## デプロイ（手動 wrangler）
```
npx wrangler deploy          # Cloudflare にログイン済み（CLOUDFLARE_API_TOKEN）のPCで
```
公開URL: https://mirrorx.jp-x.workers.dev
（`*.workers.dev` はCloudflareアカウントの内部名です。将来、独自ドメインを付ける場合は Workers の Custom Domain を使います。）

## 画像を差し替える
`public/images/steps/` の説明画像（今はイラストSVG。`step3-chrome.png` だけ実画面）を、実際のスクリーンショットに差し替えます。
同じファイル名で置くか、`index.html` の `src` を変えるだけです。OGP等は `tools/make-images.ps1` で再作成できます。

## ローカル確認
```
node serve.js
node tools/check-links.js              # リンク確認
node tools/check-links.js https://mirrorx.jp-x.workers.dev   # 公開後の確認
```

## 名前・URLについて
- 正式名称は **MirrorX**。公式URLは https://mirrorx.jp-x.workers.dev/ です。
- 旧URL `taisa-mirror.jp-x.workers.dev`（開発コードネーム時代のURL）は、当面そのまま残してあります。リンクが外部に残っている可能性があるため、削除はせず、将来は新URLへの転送（301）にする予定です。
- GitHubのリポジトリ名（`jpn-x/taisa-mirror`、`jpn-x/taisa-mirror-site`）と、`config.js` の内部変数名 `window.TAISA` は、開発コードネームのまま残しています（リンク切れや履歴の混乱を避けるため）。
