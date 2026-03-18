function atualizarContador() {
  const dataInicial = new Date('2026-01-20T20:00:00'); // Ajuste para a data real!
  const agora = new Date();

  let anos = agora.getFullYear() - dataInicial.getFullYear();
  let meses = agora.getMonth() - dataInicial.getMonth();
  let dias = agora.getDate() - dataInicial.getDate();
  let horas = agora.getHours() - dataInicial.getHours();
  let minutos = agora.getMinutes() - dataInicial.getMinutes();
  let segundos = agora.getSeconds() - dataInicial.getSeconds();

  if (segundos < 0) { segundos += 60; minutos--; }
  if (minutos < 0)  { minutos += 60;  horas--;   }
  if (horas < 0)    { horas += 24;    dias--;    }
  if (dias < 0) {
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += mesAnterior.getDate();
    meses--;
  }
  if (meses < 0) { meses += 12; anos--; }

  const pad = n => String(n).padStart(2, '0');

  const partes = [];
  if (anos > 0) partes.push(`<span class="cnt-unit"><strong>${anos}</strong> ${anos === 1 ? 'ano' : 'anos'}</span>`);
  if (meses > 0 || anos > 0) partes.push(`<span class="cnt-unit"><strong>${meses}</strong> ${meses === 1 ? 'mês' : 'meses'}</span>`);
  partes.push(`<span class="cnt-unit"><strong>${dias}</strong> ${dias === 1 ? 'dia' : 'dias'}</span>`);
  partes.push(`<span class="cnt-unit"><strong>${pad(horas)}</strong> h</span>`);
  partes.push(`<span class="cnt-unit"><strong>${pad(minutos)}</strong> min</span>`);
  partes.push(`<span class="cnt-unit"><strong>${pad(segundos)}</strong> seg</span>`);

  const el = document.getElementById('contador');
  if (el) el.innerHTML = partes.join('<span class="cnt-sep">·</span>');
}

// Add inline styles for cnt-unit
const style = document.createElement('style');
style.textContent = `
  #contador {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 6px 4px;
    font-size: 1.1rem;
    line-height: 1.8;
  }
  .cnt-unit {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: rgba(242,167,195,0.15);
    border-radius: 10px;
    padding: 6px 12px;
    min-width: 56px;
  }
  .cnt-unit strong {
    font-size: 1.5rem;
    color: var(--rose-deep, #e0739c);
    line-height: 1.2;
  }
  .cnt-sep {
    color: var(--rose, #f2a7c3);
    font-size: 1.2rem;
    align-self: center;
  }
`;
document.head.appendChild(style);

atualizarContador();
setInterval(atualizarContador, 1000);