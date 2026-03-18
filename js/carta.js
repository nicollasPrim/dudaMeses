function abrirCarta() {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const cartaWrapper    = document.getElementById('cartaWrapper');
  const envelope        = document.getElementById('envelope');

  // Prevent double-click
  envelope.onclick = null;

  // 1. Open the flap
  envelope.classList.add('open');

  // 2. Fade & shrink envelope out
  setTimeout(() => {
    envelopeWrapper.style.opacity   = '0';
    envelopeWrapper.style.transform = 'scale(0.85) translateY(-16px)';
  }, 450);

  // 3. Hide envelope, reveal letter
  setTimeout(() => {
    envelopeWrapper.style.display = 'none';
    cartaWrapper.classList.remove('hidden');
    // Re-trigger animation cleanly
    cartaWrapper.style.animation = 'none';
    void cartaWrapper.offsetWidth; // reflow
    cartaWrapper.style.animation = '';
  }, 950);
}