# OGP画像・アイコンPNGを、Chrome(ヘッドレス)で作ります（追加ツール不要）。
#   powershell -ExecutionPolicy Bypass -File tools\make-images.ps1
$root = Split-Path -Parent $PSScriptRoot
$chrome = @('C:\Program Files\Google\Chrome\Application\chrome.exe', 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe') | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { throw 'Chrome か Edge が見つかりません' }
$img = Join-Path $root 'public\images'
$profile = Join-Path ([IO.Path]::GetTempPath()) 'mirrorx-headless-profile'   # 普段のChromeとは別の一時プロファイル

function Shot($html, $out, $w, $h, $transparent) {
  $a = @('--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', "--window-size=$w,$h", '--virtual-time-budget=6000', "--screenshot=$out", "--user-data-dir=$profile")
  if ($transparent) { $a += '--default-background-color=00000000' }
  $a += ('file:///' + ($html -replace '\\', '/'))
  $prev = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
  & $chrome @a 2>&1 | Out-Null
  $ErrorActionPreference = $prev
  if (-not (Test-Path $out)) { throw "failed: $out" }
  Write-Host ("wrote {0} ({1} bytes)" -f $out, (Get-Item $out).Length)
}
# og-image.png は大佐の指定画像に差し替え済み（2026-10-04）。上書きしないよう、og.html からの自動生成は止めています。
# Shot (Join-Path $PSScriptRoot 'og.html')   (Join-Path $img 'og-image.png')          1200 630 $false
Shot (Join-Path $PSScriptRoot 'icon.html') (Join-Path $img 'apple-touch-icon.png')  180  180 $true
Shot (Join-Path $PSScriptRoot 'icon.html') (Join-Path $img 'favicon-32.png')         32   32 $true
