'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('site-nav');
navigation.classList.add('collapsible');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
  menuToggle.querySelector('span').textContent = expanded ? '＋' : '−';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('span').textContent = '＋';
    menuToggle.focus();
  }
});
const demoValues = {
  before: ['原始資料 · 等待確認','␣範例公司␣','前後空白','「1,850.25」','文字格式','2025/12/31','待確認格式','AI 提出建議後，仍由使用者勾選確認。'],
  after: ['整理示意 · 經使用者確認','範例公司','已去除空白','1850.25','數值格式','2025-12-31','一致格式','示意：僅套用使用者確認的修正，並保留資料原意。']
};
const demoIds = ['demo-title','demo-company','demo-company-note','demo-value','demo-value-note','demo-date','demo-date-note','demo-caption'];
document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.demo;
  demoIds.forEach((id, index) => { document.getElementById(id).textContent = demoValues[mode][index]; });
  document.querySelector('.demo-table-wrap').classList.toggle('cleaned', mode === 'after');
  document.querySelectorAll('[data-demo]').forEach(item => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
}));
const imageDialog = document.getElementById('image-dialog');
let lastImageButton;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  lastImageButton = button;
  const img = document.getElementById('expanded-image');
  img.src = button.dataset.image;
  img.alt = button.dataset.caption;
  document.getElementById('image-title').textContent = button.dataset.caption;
  imageDialog.showModal();
  document.body.style.overflow = 'hidden';
  imageDialog.scrollTop = 0;
}));
document.getElementById('close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  const bounds = imageDialog.getBoundingClientRect();
  if (event.target === imageDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) imageDialog.close();
});
imageDialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  if (lastImageButton) lastImageButton.focus();
});
