document.addEventListener('DOMContentLoaded', function () {
  const playBtns     = document.querySelectorAll('.track-play');
  const stickyPlayer = document.getElementById('stickyPlayer');
  const stickyEmbed  = document.getElementById('stickyEmbed');
  const spName       = document.getElementById('spName');
  const spArtist     = document.getElementById('spArtist');
  const spClose      = document.getElementById('spClose');

  let activeBtn = null;

  playBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Clicking active track → stop
      if (activeBtn === btn) { stopPlayer(); return; }

      // Deactivate previous
      if (activeBtn) {
        activeBtn.textContent = '▶';
        activeBtn.classList.remove('playing');
      }

      const src    = btn.dataset.src;
      const track  = btn.closest('.track');
      const name   = track.querySelector('.track-name').textContent;
      const artist = track.querySelector('.track-artist').textContent;

      btn.textContent = '■';
      btn.classList.add('playing');
      activeBtn = btn;

      spName.textContent   = name;
      spArtist.textContent = artist;

      // Append autoplay param
      stickyEmbed.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';

      stickyPlayer.classList.add('visible');
      document.body.classList.add('player-open');

      track.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  function stopPlayer() {
    if (activeBtn) {
      activeBtn.textContent = '▶';
      activeBtn.classList.remove('playing');
      activeBtn = null;
    }
    stickyEmbed.src = '';
    stickyPlayer.classList.remove('visible');
    document.body.classList.remove('player-open');
  }

  spClose.addEventListener('click', stopPlayer);

  window.addEventListener('beforeunload', () => { stickyEmbed.src = ''; });
});