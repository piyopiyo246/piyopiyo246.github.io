document.addEventListener('DOMContentLoaded', function() {
    // 1. 全文表示を実行する共通関数（対象のコンテナを引数にとる）
    function revealContainer(container) {
        if (!container) return;
        
        const shortText = container.querySelector('.short-text');
        const fadeOut = container.querySelector('.fade-out');
        const fullText = container.querySelector('.full-text');
        const button = container.querySelector('#show-more-button');

        if (fullText && !fullText.classList.contains('visible')) {
            if (shortText) shortText.style.height = 'auto'; // 高さ制限を解除
            if (fadeOut) fadeOut.style.display = 'none';    // フェードアウトを非表示
            fullText.classList.add('visible');             // 全文を表示
            if (button) button.style.display = 'none';      // ボタンを非表示
        }
    }

    // 2. ボタンクリック時の動作（ページ内のすべてのボタンに設定）
    const allButtons = document.querySelectorAll('#show-more-button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.long-text-container');
            revealContainer(container);
        });
    });

    // 3. URLのハッシュを判定して自動開閉する関数
    function checkHashAndReveal() {
        if (window.location.hash) {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ターゲット要素が含まれている親コンテナを特定
                const container = targetElement.closest('.long-text-container');
                if (container) {
                    revealContainer(container);
                    
                    // 表示直後にスクロール位置を再調整
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        }
    }

    // 4. 【重要】初回読み込み時と、ページ内リンククリック（ハッシュ変更）時の両方を監視
    checkHashAndReveal(); // ページ読み込み時
    window.addEventListener('hashchange', checkHashAndReveal); // リンククリック時
});
