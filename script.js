document.addEventListener('DOMContentLoaded', () => {
  /* ===== CONTACTS PAGE IN-ANIMATION ===== */
  if (document.body.classList.contains('contacts-page')) {
    const bars = document.querySelectorAll('.contact-bar');

    bars.forEach((bar) => {
      void bar.offsetWidth;              // force reflow so animation always plays
      bar.classList.add('animate-in');   // .contacts-page .contact-bar.animate-in { animation: contactSlideIn ... }
    });
  }

  /* ===== PORTFOLIO PAGE IN-ANIMATION ===== */
  if (document.body.classList.contains('portfolio-page')) {
    const featured = document.querySelector('.featured-panel');
    const grid     = document.querySelector('.portfolio-grid');

    if (featured) {
      void featured.offsetWidth;                 // reflow
      featured.classList.add('portfolio-animate-in');
    }

    if (grid) {
      void grid.offsetWidth;                    // reflow
      grid.classList.add('portfolio-animate-in');
    }
  }

  /* ===== HOME PAGE IN-ANIMATION ===== */
  if (document.body.classList.contains('home-page')) {
    const circles = document.querySelectorAll('.profile-circle');

    circles.forEach((circle) => {
      void circle.offsetWidth;                  // reflow
      circle.classList.add('home-animate-in');
    });
  }

  /* ===== ARTIFICIAL PAGE DRAG STRIP ===== */
  const track = document.getElementById('artificialTrack');
  if (track) {
    let isDown = false;
    let startX = 0;
    let currentX = 0;

    const getBounds = () => {
  const wrapper = track.parentElement;
  const trackWidth = track.scrollWidth;
  const wrapperWidth = wrapper.clientWidth;

  const extra = 40; // small overscroll allowance in px

  const maxShift = extra;                         // allow a bit past the left edge
  const minShift = wrapperWidth - trackWidth - extra; // and a bit past the right

  return { maxShift, minShift };
};

    const startDrag = (e) => {
      isDown = true;
      track.classList.add('dragging');
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      startX = clientX - currentX;
    };

    const moveDrag = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      currentX = clientX - startX;

      const { maxShift, minShift } = getBounds();
      if (currentX > maxShift) currentX = maxShift;
      if (currentX < minShift) currentX = minShift;

      track.style.transform = `translateX(${currentX}px)`;
    };

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('dragging');
    };

    track.addEventListener('mousedown', startDrag);
    track.addEventListener('touchstart', startDrag, { passive: false });

    window.addEventListener('mousemove', moveDrag, { passive: false });
    window.addEventListener('touchmove', moveDrag, { passive: false });

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
  }
});




document.addEventListener('DOMContentLoaded', () => {
  // existing animation + drag code...

  const noDragImgs = document.querySelectorAll('.artificial-img');
  noDragImgs.forEach(img => {
    img.setAttribute('draggable', 'false');      // disable native drag
    img.addEventListener('dragstart', e => e.preventDefault());
  });
});
