export function mountGalleryLightbox() {
  const meta = Array.from(document.querySelectorAll<HTMLElement>('[data-gallery-index]'));
  const lb = document.getElementById('gallery-lightbox');
  const img = document.getElementById('lb-img') as HTMLImageElement | null;
  const cap = document.getElementById('lb-caption');
  const close = document.getElementById('lb-close');
  const prev = document.getElementById('lb-prev');
  const next = document.getElementById('lb-next');
  if (!lb || !img || !cap || !close || !prev || !next) return;
  let idx = 0;
  const open = (i: number) => {
    const b = meta[i];
    if (!b) return;
    idx = i;
    const im = b.querySelector('img') as HTMLImageElement | null;
    if (!im) return;
    img.src = im.src;
    img.alt = im.alt;
    cap.innerHTML = b.getAttribute('data-caption') || '';
    lb.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  const shut = () => {
    lb.classList.add('hidden');
    document.body.style.overflow = '';
  };
  const go = (d: number) => open((idx + d + meta.length) % meta.length);
  meta.forEach((b) =>
    b.addEventListener('click', () => open(parseInt(b.getAttribute('data-gallery-index') || '0', 10)))
  );
  close.addEventListener('click', shut);
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  lb.addEventListener('click', (e) => {
    if (e.target === lb) shut();
  });
  document.addEventListener('keydown', (e) => {
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') shut();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountGalleryLightbox);
} else {
  mountGalleryLightbox();
}
