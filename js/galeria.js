// Gallery lightbox with Spotify player
document.addEventListener('DOMContentLoaded', function () {
  const items     = document.querySelectorAll('.gallery-item');
  const lightbox  = document.getElementById('lightbox');
  const closeBtn  = document.getElementById('lightbox-close');
  const lbImg     = document.getElementById('lightbox-img');
  const spotifyFrame = document.getElementById('spotify-frame');
  const playerBox    = document.getElementById('lightbox-player');

  // Open lightbox
  items.forEach(item => {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      if (!img || item.classList.contains('placeholder')) return;

      const track  = item.dataset.track;

      // Set image
      lbImg.src = img.src;
      lbImg.alt = img.alt;

      // Set Spotify player
      if (track) {
        // Reset src first to force reload (stops previous track)
        spotifyFrame.src = '';
        // Small delay so iframe re-initialises cleanly
        setTimeout(() => {
          spotifyFrame.src =
            `https://open.spotify.com/embed/track/${track}?utm_source=generator&autoplay=1`;
        }, 80);

        playerBox.style.display  = 'flex';
      } else {
        playerBox.style.display = 'none';
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close helpers
  function fecharLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Stop music by clearing src
    spotifyFrame.src = '';
  }

  // Close on button
  closeBtn.addEventListener('click', fecharLightbox);

  // Close on backdrop click (but not on content)
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) fecharLightbox();
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharLightbox();
  });

  // Stagger entrance animation
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