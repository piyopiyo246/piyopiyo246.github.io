document.addEventListener('DOMContentLoaded', function() {
    // 1. 全文表示を実行する共通関数
    function revealContainer(container) {
        if (!container) return;
        const shortText = container.querySelector('.short-text');
        const fadeOut = container.querySelector('.fade-out');
        const fullText = container.querySelector('.full-text');
        const button = container.querySelector('#show-more-button');

        if (fullText && !fullText.classList.contains('visible')) {
            if (shortText) shortText.style.height = 'auto';
            if (fadeOut) fadeOut.style.display = 'none';
            fullText.classList.add('visible');
            if (button) button.style.display = 'none';
        }
    }

    // 2. ボタンクリック時の動作
    const allButtons = document.querySelectorAll('#show-more-button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.long-text-container');
            revealContainer(container);
        });
    });

    // 3. 【改良版】URLのハッシュを判定し、オフセット付きでスクロール
    function checkHashAndReveal() {
        if (window.location.hash) {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const container = targetElement.closest('.long-text-container');
                if (container) {
                    revealContainer(container);
                }

                // スクロール位置の微調整（2行分上にずらす）
                setTimeout(() => {
                    const offset = 80; // ここで「二行分」の幅(px)を調整
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 200); // 描画完了を待つため少し長めに設定
            }
        }
    }

    checkHashAndReveal();
    window.addEventListener('hashchange', checkHashAndReveal);
});
