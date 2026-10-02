// 全リンク確認: node tools/check-links.js [ベースURL]   例) node tools/check-links.js https://taisa-mirror.jp-x.workers.dev
// index.html の href/src と config.js のリンクを実際に取得して、404などを洗い出します。
const fs = require('fs'), path = require('path'), vm = require('vm');
const base = (process.argv[2] || '').replace(/\/$/, '');
const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'public', 'config.js'), 'utf8'), ctx);
const T = ctx.window.TAISA;
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const urls = new Map(); // url -> where
const add = (u, w) => { if (u && !urls.has(u)) urls.set(u, w); };
for (const m of html.matchAll(/(href|src|content)="([^"]+)"/g)) {
  const u = m[2];
  if (m[1] !== 'content' && u.startsWith('#')) { if (!ids.has(u.slice(1))) console.log('ANCHOR MISSING', u); continue; }
  if (m[1] !== 'content' || /^https?:/.test(u)) if (/^(https?:)?\/\//.test(u) && !/\.(png|svg|jpg)$/.test(u) && !u.includes('fonts.g')) { add(u, 'html'); continue; }
  if (/^[\w./-]+\.(css|js|svg|png)$/.test(u) && !u.startsWith('http')) { if (base) add(base + '/' + u, 'asset'); else if (!fs.existsSync(path.join(__dirname, '..', 'public', u))) console.log('FILE MISSING', u); }
}
for (const [k, v] of Object.entries(T)) if (/^https?:/.test(v)) add(v, 'config.' + k);
if (base) { add(base + '/', 'page'); add(base + '/images/og-image.png', 'ogp'); }
(async () => {
  let bad = 0;
  for (const [u, w] of urls) {
    try {
      let r = await fetch(u, { redirect: 'follow', method: 'HEAD' });
      if (r.status === 405 || r.status === 403) r = await fetch(u, { redirect: 'follow' });
      const ok = r.status >= 200 && r.status < 300;
      if (!ok) bad++;
      console.log((ok ? 'OK  ' : 'NG  ') + r.status + '  ' + u + '  [' + w + ']' + (r.headers.get('content-length') ? '  ' + r.headers.get('content-length') + 'B' : ''));
    } catch (e) { bad++; console.log('NG  ERR  ' + u + '  ' + e.message); }
  }
  console.log(bad ? `\n${bad} 件の問題があります` : '\nすべてOK (' + urls.size + ' 件)');
  process.exit(bad ? 1 : 0);
})();
