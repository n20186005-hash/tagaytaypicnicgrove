declare global {
  interface Window {
    __TPG_HERO_URL__?: string;
  }
}

type PaletteKey = 'ridge' | 'sunset' | 'lake' | 'noir';
type RatioKey = '1:1' | '3:4' | '9:16';

const palettes: Record<PaletteKey, {
  paper: string; title: string; sub: string; bar: string; grad: [string, string];
}> = {
  ridge: { paper: '#faf7f2', title: '#1e1e1e', sub: '#4a4a4a', bar: '#305725', grad: ['#305725', '#0f200b'] },
  sunset: { paper: '#fff7ec', title: '#3a130a', sub: '#6d2a1a', bar: '#d66823', grad: ['#d66823', '#3a130a'] },
  lake: { paper: '#f0f7ff', title: '#182c54', sub: '#214789', bar: '#2577ec', grad: ['#2577ec', '#182c54'] },
  noir: { paper: '#0f0f0f', title: '#faf7f2', sub: '#d4d4d4', bar: '#d66823', grad: ['#1e1e1e', '#000000'] },
};

const sizes: Record<RatioKey, [number, number]> = {
  '1:1': [500, 500],
  '3:4': [750, 1000],
  '9:16': [1080, 1920],
};

const $ = (id: string) => document.getElementById(id);

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const ir = img.width / img.height;
  const br = w / h;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (ir > br) { sw = img.height * br; sx = (img.width - sw) / 2; }
  else { sh = img.width / br; sy = (img.height - sh) / 2; }
  ctx.save();
  roundRect(ctx, x, y, w, h, 18);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  ctx.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    im.onload = () => res(im);
    im.onerror = rej;
    im.src = src;
  });
}

function getRatio(): RatioKey {
  const r = document.querySelector('input[name="sc-ratio"]:checked') as HTMLInputElement | null;
  return (r && (r.value as RatioKey)) || '1:1';
}
function getStyle(): PaletteKey {
  const s = document.querySelector('input[name="sc-style"]:checked') as HTMLInputElement | null;
  return (s && (s.value as PaletteKey)) || 'ridge';
}

export function mountSouvenirCard(heroUrlFallback: string) {
  const canvas = $('sc-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const titleEl = $('sc-title') as HTMLInputElement | null;
  const subEl = $('sc-subtitle') as HTMLInputElement | null;
  const uploadEl = $('sc-upload') as HTMLInputElement | null;
  const cameraBtn = $('sc-camera');
  const resetBtn = $('sc-reset');
  const dlBtn = $('sc-download');
  if (!titleEl || !subEl || !uploadEl || !cameraBtn || !resetBtn || !dlBtn) return;

  const today = new Date();
  subEl.value = today.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });

  let uploaded: HTMLImageElement | null = null;
  let defaultPlaceholder: HTMLImageElement | null = null;

  const render = () => {
    const ratio = getRatio();
    const [W, H] = sizes[ratio];
    canvas.width = W;
    canvas.height = H;
    const style = palettes[getStyle()];
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, style.grad[0]);
    g.addColorStop(1, style.grad[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    const pad = Math.round(Math.min(W, H) * 0.06);
    const paperW = W - pad * 2;
    const titleH = Math.round(H * 0.18);
    const photoH = H - pad * 3 - titleH;
    roundRect(ctx, pad, pad, paperW, H - pad * 2, Math.round(Math.min(W, H) * 0.04));
    ctx.fillStyle = style.paper;
    ctx.fill();
    const photo = uploaded || defaultPlaceholder;
    if (photo) drawCover(ctx, photo, pad + pad * 0.6, pad + pad * 0.6, paperW - pad * 1.2, photoH);
    const titleY = pad + pad * 0.6 + photoH + pad * 0.6;
    ctx.fillStyle = style.bar;
    roundRect(ctx, pad + pad * 0.6, titleY, Math.round(paperW * 0.18), 4, 2);
    ctx.fill();
    ctx.fillStyle = style.title;
    const titleSize = Math.max(18, Math.round(Math.min(W, H) * 0.055));
    ctx.font = '600 ' + titleSize + 'px ui-serif, Georgia, serif';
    ctx.textBaseline = 'top';
    ctx.fillText(titleEl.value || 'Tagaytay Picnic Grove', pad + pad * 0.6, titleY + 14);
    ctx.fillStyle = style.sub;
    const subSize = Math.max(12, Math.round(titleSize * 0.6));
    ctx.font = subSize + 'px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText(subEl.value || '', pad + pad * 0.6, titleY + 14 + titleSize + 6);
  };

  const setUploadedFromFile = (file: File | undefined | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      loadImage(reader.result as string)
        .then((im) => { uploaded = im; render(); })
        .catch(() => undefined);
    };
    reader.readAsDataURL(file);
  };

  uploadEl.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    setUploadedFromFile(t.files && t.files[0]);
  });

  cameraBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      const v = document.createElement('video');
      v.srcObject = stream;
      v.setAttribute('playsinline', 'true');
      await v.play();
      const [cw, ch] = sizes['1:1'];
      const cc = document.createElement('canvas');
      cc.width = cw;
      cc.height = ch;
      const cx = cc.getContext('2d');
      if (cx) {
        const aspect = v.videoWidth / v.videoHeight;
        const target = cw / ch;
        let sx = 0, sy = 0, sw = v.videoWidth, sh = v.videoHeight;
        if (aspect > target) { sw = v.videoHeight * target; sx = (v.videoWidth - sw) / 2; }
        else { sh = v.videoWidth / target; sy = (v.videoHeight - sh) / 2; }
        cx.drawImage(v, sx, sy, sw, sh, 0, 0, cw, ch);
      }
      stream.getTracks().forEach((t) => t.stop());
      loadImage(cc.toDataURL('image/png'))
        .then((im) => { uploaded = im; render(); })
        .catch(() => undefined);
    } catch {
      const fi = document.createElement('input');
      fi.type = 'file';
      fi.accept = 'image/*';
      fi.setAttribute('capture', 'environment');
      fi.addEventListener('change', () => setUploadedFromFile(fi.files && fi.files[0]));
      fi.click();
    }
  });

  resetBtn.addEventListener('click', () => { uploaded = null; render(); });
  dlBtn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.download = 'tagaytay-picnic-grove-' + Date.now() + '.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });
  [titleEl, subEl].forEach((el) => el.addEventListener('input', render));
  document.querySelectorAll('input[name="sc-ratio"], input[name="sc-style"]').forEach((el) =>
    el.addEventListener('change', render)
  );
  const heroUrl = (window.__TPG_HERO_URL__ as string | undefined) || heroUrlFallback;
  loadImage(heroUrl)
    .then((im) => { defaultPlaceholder = im; render(); })
    .catch(() => { render(); });
}

const HERO_FALLBACK = '';
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => mountSouvenirCard(HERO_FALLBACK));
} else {
  mountSouvenirCard(HERO_FALLBACK);
}

export {};
