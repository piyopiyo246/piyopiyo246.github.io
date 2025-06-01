document.addEventListener('DOMContentLoaded', function() {
const showMoreButton = document.getElementById('show-more-button');
const shortText = document.querySelector('.short-text');
const fadeOut = document.querySelector('.fade-out');
const fullText = document.querySelector('.full-text');

showMoreButton.addEventListener('click', function() {
shortText.style.height = 'auto'; /* 高さ制限を解除 */
fadeOut.style.display = 'none'; /* フェードアウトを非表示 */
fullText.classList.add('visible'); /* 全文を表示 */
showMoreButton.style.display = 'none'; /* ボタンを非表示 */
});
});