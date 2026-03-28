(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  const pbTop    = document.getElementById('pb-top');
  const pbRight  = document.getElementById('pb-right');
  const pbBottom = document.getElementById('pb-bottom');
  const pbLeft   = document.getElementById('pb-left');
  const counter  = document.getElementById('counter');
  let current = 0;

  function show(index, direction) {
    if (index < 0 || index >= total) return;
    const prev = current;
    current = index;
    slides.forEach((s, i) => {
      s.classList.remove('active', 'exit-left');
      if (i === current) s.classList.add('active');
      else if (i === prev && direction === 'next') s.classList.add('exit-left');
    });
    const p = ((current + 1) / total) * 4;
    pbTop.style.width    = Math.min(1, p)                 * 100 + '%';
    pbRight.style.height = Math.min(1, Math.max(0, p-1)) * 100 + '%';
    pbBottom.style.width = Math.min(1, Math.max(0, p-2)) * 100 + '%';
    pbLeft.style.height  = Math.min(1, Math.max(0, p-3)) * 100 + '%';
    counter.textContent = (current + 1) + ' / ' + total;
  }

  function next() { show(current + 1, 'next'); }
  function prev() { show(current - 1, 'prev'); }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', function (e) { touchStartX = e.changedTouches[0].screenX; });
  document.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); }
  });

  show(0, 'next');

  window.vibeNav = { next, prev };
})();
