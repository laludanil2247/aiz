// ===== CONFETTI di modal =====
let modalConfetti;

function burstConfettiInModal() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('confettiModal');
  if (!modalConfetti) modalConfetti = confetti.create(canvas, { resize: true, useWorker: true });

  const duration = 900;
  const end = Date.now() + duration;

  (function frame() {
    modalConfetti({ particleCount: 5, startVelocity: 32, spread: 70, origin: { x: 0.1, y: 0.2 } });
    modalConfetti({ particleCount: 5, startVelocity: 32, spread: 70, origin: { x: 0.9, y: 0.2 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  modalConfetti({ particleCount: 120, spread: 80, gravity: 0.9, origin: { x: 0.5, y: 0.2 } });
}

// ===== Modal + BGM =====
function show_modal() {
  const a = document.getElementById('bgm');
  if (a) a.play?.().catch(() => {});
  $('#myModal').modal('show');
  return false;
}

// ===== Aksesibilitas inert main saat modal aktif =====
(function () {
  const $modal = $('#myModal');
  const modalEl = $modal.get(0);
  const main = document.querySelector('main');

  $modal.on('shown.bs.modal', () => {
    modalEl?.focus?.();
    if (main) {
      if ('inert' in HTMLElement.prototype) main.setAttribute('inert', '');
      else main.setAttribute('aria-hidden', 'true');
    }
    setTimeout(burstConfettiInModal, 60);
  });

  $modal.on('hidden.bs.modal', () => {
    if (main) {
      main.removeAttribute('inert');
      main.removeAttribute('aria-hidden');
    }
  });
})();

// ===== Tombol "GA" lari + suara error =====
(function () {
  const wrap = document.querySelector('.buttons');
  const bn = document.getElementById('Bn');
  const err = document.getElementById('errorSfx');

  const margin = 8;
  const minMove = 64;
  const last = { x: 16, y: 16 };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function safeBounds() {
    const w = Math.max(wrap.clientWidth, 200);
    const h = Math.max(wrap.clientHeight, 160);
    const bw = Math.max(bn.offsetWidth, 80);
    const bh = Math.max(bn.offsetHeight, 40);
    return {
      maxLeft: Math.max(margin, w - bw - margin),
      maxTop: Math.max(margin, h - bh - margin)
    };
  }

  function moveBn() {
    const b = safeBounds();
    let nx, ny, tries = 0;
    do {
      nx = Math.random() * (b.maxLeft - margin) + margin;
      ny = Math.random() * (b.maxTop - margin) + margin;
      tries++;
      if (tries > 24) break;
    } while (Math.hypot(nx - last.x, ny - last.y) < minMove);

    last.x = clamp(nx, margin, b.maxLeft);
    last.y = clamp(ny, margin, b.maxTop);
    bn.style.left = last.x + 'px';
    bn.style.top = last.y + 'px';
  }

  function playError() {
    if (err) {
      err.currentTime = 0;
      err.play?.().catch(() => {});
    }
    if (navigator.vibrate) navigator.vibrate(40);
  }

  bn.addEventListener('pointerdown', e => { e.preventDefault(); playError(); moveBn(); }, { passive: false });
  bn.addEventListener('touchstart', e => { e.preventDefault(); playError(); moveBn(); }, { passive: false });
  bn.addEventListener('mouseover', moveBn);

  function centerInit() {
    const b = safeBounds();
    last.x = Math.floor(b.maxLeft / 2);
    last.y = Math.floor(b.maxTop / 2);
    bn.style.left = last.x + 'px';
    bn.style.top = last.y + 'px';
  }

  window.addEventListener('load', () => { centerInit(); setTimeout(moveBn, 120); });
  window.addEventListener('resize', centerInit);
  window.addEventListener('orientationchange', () => { setTimeout(centerInit, 120); });
})();

// ===== Efek setelah tombol "Tutup" diklik =====
(function () {
  const closeBtn = document.querySelector('#myModal .btn-default');
  if (!closeBtn) return;

  closeBtn.addEventListener('click', () => {
    // Tampilkan pesan kecil
    setTimeout(() => {
      alert("bentar-bentar satu lagi 😆");
      // Redirect ke halaman selanjutnya
      window.location.href = "bunga/index.html";
    }, 500); // jeda setengah detik setelah klik sebelum alert muncul
  });
})();
