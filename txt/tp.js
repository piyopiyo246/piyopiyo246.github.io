document.addEventListener('DOMContentLoaded', function() {
    const showMoreButton = document.getElementById('show-more-button');
    const shortText = document.querySelector('.short-text');
    const fadeOut = document.querySelector('.fade-out');
    const fullText = document.querySelector('.full-text');

    // 1. 全文表示処理を共通関数として定義
    function revealFullText() {
        if (fullText && !fullText.classList.contains('visible')) {
            shortText.style.height = 'auto'; // 高さ制限を解除
            fadeOut.style.display = 'none'; // フェードアウトを非表示
            fullText.classList.add('visible'); // 全文を表示
            showMoreButton.style.display = 'none'; // ボタンを非表示
        }
    }

    // 2. ボタンクリック時の動作
    if (showMoreButton) {
        showMoreButton.addEventListener('click', revealFullText);
    }

    // 3. 【追加】URLにハッシュがある場合の自動開閉チェック
    if (window.location.hash) {
        const targetId = window.location.hash; // 例: "#t_c_010_409"
        const targetElement = document.querySelector(targetId);
        
        // ターゲット要素が存在し、かつそれが full-text コンテナの中にあるか確認
        if (targetElement && fullText.contains(targetElement)) {
            revealFullText();
            
            // 表示直後にスクロール位置を再調整（念のため）
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});
