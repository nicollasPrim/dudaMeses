document.addEventListener('DOMContentLoaded', function () {
  const items           = document.querySelectorAll('.gallery-item');
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const spotifyEmbed    = document.getElementById('spotifyEmbed');
  const playerSongName  = document.getElementById('playerSongName');
  const lightboxPlayer  = document.getElementById('lightboxPlayer');
  const lightboxClose   = document.getElementById('lightboxClose');

  // Abre o lightbox — funciona em click (desktop) e touch (mobile)
  function abrirItem(e) {
    e.preventDefault();
    const item = e.currentTarget;
    const img  = item.querySelector('img');
    if (!img || item.classList.contains('placeholder')) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    const spotifySrc = item.dataset.spotify || '';
    const songName   = item.dataset.song    || '';

    if (spotifySrc) {
      spotifyEmbed.src = spotifySrc + (spotifySrc.includes('?') ? '&' : '?') + 'autoplay=1';
      playerSongName.textContent = songName;
      lightboxPlayer.style.display = 'flex';
    } else {
      spotifyEmbed.src = '';
      lightboxPlayer.style.display = 'none';
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  items.forEach(item => {
    item.addEventListener('click',    abrirItem);
    item.addEventListener('touchend', abrirItem, { passive: false });
  });

  // Fecha
  function fecharLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { spotifyEmbed.src = ''; }, 250);
  }

  lightboxClose.addEventListener('click',    e => { e.stopPropagation(); fecharLightbox(); });
  lightboxClose.addEventListener('touchend', e => { e.stopPropagation(); fecharLightbox(); }, { passive: false });

  lightbox.addEventListener('click', e => { if (e.target === lightbox) fecharLightbox(); });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharLightbox(); });

  // Entrada animada
  items.forEach((item, i) => {
    item.style.opacity   = '0';
    item.style.transform = 'translateY(16px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      item.style.opacity   = '1';
      item.style.transform = 'translateY(0)';
    }, 80 * i);
  });
});