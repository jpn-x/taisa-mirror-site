// ============================================================
//  TAISA Mirror の新バージョンが出たら、このファイルの
//  「version」「downloadUrl」「sha256」だけ変えればOK（HTML/CSSは触らない）。
//  ※ releaseUrl は version から自動で作ります。
// ============================================================
window.TAISA = {
  version: '0.1.3',
  downloadUrl: 'https://github.com/jpn-x/taisa-mirror/releases/download/v0.1.3/taisa-mirror-v0.1.3-win-x64.zip',
  sha256: '8c7dd56b6911a381103e3d25ac9f2aad0f156fc2cbd8361ec274bfc1803b827c',

  // ↓ ふだんは変えない
  githubUrl: 'https://github.com/jpn-x/taisa-mirror',
  siteRepoUrl: 'https://github.com/jpn-x/taisa-mirror-site',
  troubleshootingUrl: 'https://github.com/jpn-x/taisa-mirror/blob/main/docs/TROUBLESHOOTING.md',
  verifyUrl: 'https://github.com/jpn-x/taisa-mirror/blob/main/docs/VERIFY.md',
  sharexUrl: 'https://sharex-tutorial.pages.dev/'   // 同じシリーズ（リンクのみ）
};
window.TAISA.releaseUrl = window.TAISA.githubUrl + '/releases/tag/v' + window.TAISA.version;
window.TAISA.fileName = window.TAISA.downloadUrl.split('/').pop();
