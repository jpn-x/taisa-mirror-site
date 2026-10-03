// ============================================================
//  MirrorX の新バージョンが出たら、このファイルの
//  「version」「downloadUrl」「sha256」だけ変えればOK（HTML/CSSは触らない）。
//  ※ releaseUrl は version から自動で作ります。
// ============================================================
// ※ window.TAISA は内部の変数名です（開発コードネーム TAISA MIRROR 由来）。画面には出ないので、そのまま使います。
window.TAISA = {
  version: '0.2.0',
  downloadUrl: 'https://github.com/jpn-x/taisa-mirror/releases/download/v0.2.0/mirrorx-v0.2.0-win-x64.zip',
  sha256: 'a53154154a0aa5f379abfd12030139a5a2c792b10db1a6ec660831ef4b639ac4',

  // ↓ ふだんは変えない
  githubUrl: 'https://github.com/jpn-x/taisa-mirror',
  siteRepoUrl: 'https://github.com/jpn-x/taisa-mirror-site',
  troubleshootingUrl: 'https://github.com/jpn-x/taisa-mirror/blob/main/docs/TROUBLESHOOTING.md',
  verifyUrl: 'https://github.com/jpn-x/taisa-mirror/blob/main/docs/VERIFY.md',
  sharexUrl: 'https://sharex-tutorial.pages.dev/'   // 同じシリーズ（リンクのみ）
};
window.TAISA.releaseUrl = window.TAISA.githubUrl + '/releases/tag/v' + window.TAISA.version;
window.TAISA.fileName = window.TAISA.downloadUrl.split('/').pop();
