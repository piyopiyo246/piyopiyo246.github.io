# ================================================================
# 過去ログページ14件へのnoindex追加スクリプト
# 実行場所: リポジトリルート（c_klasse.htmlがあるフォルダ）
# 注意: <p>タグ内の書き込み内容は一切変更しない
# ================================================================

$files = @(
    "txt\c-class_1t.html",
    "txt\cla_1t.html",
    "txt\clk_1t.html",
    "txt\glc_1t.html",
    "txt\mb_1t.html",
    "txt\single_thread_t.html",
    "txt\slk_1t.html",
    "txt\w204_1t.html",
    "txt\w204_2t.html",
    "txt\w205_1t.html",
    "txt\w205_2t.html",
    "txt\w205_3t.html",
    "txt\w205_4t.html",
    "txt\w206_1t.html"
)

$noindexTag = "`t<meta name=`"robots`" content=`"noindex, follow`">"

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        Write-Host "NOT FOUND: $file" -ForegroundColor Red
        continue
    }

    # バイト列として読み込み（改行・文字コードを保持）
    $bytes = [System.IO.File]::ReadAllBytes((Resolve-Path $file))
    $encoding = [System.Text.UTF8Encoding]::new($false) # BOMなしUTF-8
    $content = $encoding.GetString($bytes)

    # すでにnoindexが含まれている場合はスキップ
    if ($content -match 'noindex') {
        Write-Host "SKIP (already noindex): $file" -ForegroundColor Yellow
        continue
    }

    # </head> の直前にnoindexタグを挿入（1箇所のみ）
    if ($content -match '</head>') {
        $newContent = $content -replace '</head>', "$noindexTag`r`n</head>"
        # BOMなしUTF-8で書き戻し
        $newBytes = $encoding.GetBytes($newContent)
        [System.IO.File]::WriteAllBytes((Resolve-Path $file), $newBytes)
        Write-Host "ADDED noindex: $file" -ForegroundColor Green
    } else {
        Write-Host "ERROR (no </head> found): $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Complete." -ForegroundColor Green
