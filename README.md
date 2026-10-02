# TAISA Mirror 超入門（Phase 1）

TAISA Mirror の初心者向け1ページ解説サイト。**ShareX超入門と同じシリーズ**に見えるように、構成・余白・カード・STEP表現・丸みを揃え、差し色をスカイブルー／ラベンダーにしています。
`jpn-x/taisa-mirror`（本体）とも、ShareX超入門（元サイト）とも **完全に別プロジェクト**です。

> ShareX超入門（https://sharex-tutorial.pages.dev/）は「読み取り専用の見本」として閲覧しただけで、一切変更していません（commit / deploy / 設定変更なし。このフォルダにも元ファイルのコピーはありません）。

## ローカルで見る
```
node serve.js        # → http://localhost:8765  （依存なしの超小型サーバー）
```
（`index.html` をダブルクリックでも表示できます）

## 構成
```
index.html     本文（静的HTML 1枚）
style.css      デザイン（CSS変数で色・丸み・余白を管理）
script.js      最小限のJS（ナビ開閉・スクロール表示・トップへ戻る・リンク差し込み）
config.js      ★リンクの定数（ここだけ変えればOK）
images/logo.svg                    ロゴ／ファビコン
images/steps/*.svg                 STEPのイメージ図（後で実際のスクリーンショットに差し替え）
serve.js       ローカル確認用サーバー
```
外部通信は、Google Fonts（M PLUS Rounded 1c。ShareX超入門と同じ書体）だけです。DB・API・フレームワークはありません。

## リンクを変える（config.js）
| キー | 今の値 | 後でやること |
|---|---|---|
| `download` | `https://github.com/jpn-x/taisa-mirror/releases/latest`（最新リリースのページ） | ZIPの直リンクが決まったら差し替え |
| `github` | `https://github.com/jpn-x/taisa-mirror` | そのままでOK |
| `troubleshooting` | `…/docs/TROUBLESHOOTING.md` | 解説ページを作ったら差し替え |
| `sharex` | `https://sharex-tutorial.pages.dev/`（フッターの「同じシリーズ」） | そのままでOK |

※ `index.html` の `href` にも同じURLが書いてあります（JSが無効でも動くための予備）。変更するときは `config.js` と、`index.html` の該当 `href` の両方を合わせてください。

## 後から差し替える画像
`images/steps/` のSVG（イメージ図）を、実際のスクリーンショットに差し替える。**同じファイル名でPNG/JPGを置き、`index.html` の `src` の拡張子を変えるだけ**です。
| ファイル | 場所 | 撮るもの |
|---|---|---|
| `step5-done.svg` | HERO（上部）／完成 | ブラウザにiPhoneが映っている画面（HEROの見本） |
| `step1-zip-menu.svg` | STEP 1 | ZIPを右クリック →「すべて展開」 |
| `step1-folder.svg` | STEP 1 | 展開したフォルダ（Start TAISA Mirror.cmd が見える） |
| `step2-start.svg` | STEP 2 | Start TAISA Mirror.cmd をダブルクリックする場面 |
| `step3-chrome.svg` | STEP 3 | Chromeの「ミラーリング開始」ボタン |
| `step4-iphone.svg` | STEP 4 | iPhoneの 右上スワイプ → 画面ミラーリング → TAISA Mirror |
| `logo.svg` | ヘッダー／ファビコン | 必要なら正式ロゴに差し替え |

## Phase 2 でやること
- 実際のスクリーンショットへの差し替え（上の表）
- OGP画像（`og:image`）、`<meta name="robots" content="noindex">` を外す（公開時）
- Cloudflare Pages へのdeploy・ドメイン（`*.jreco.net` か `*.pages.dev` を大佐に確認）
- ダウンロードを GitHub Release のZIP直リンクへ（バージョン固定をどうするか決める）
- 詳細トラブルシューティング用の解説ページ（必要なら）
- 実機の iPhone / スマホ Chrome での最終表示確認、文章の最終推敲
