document.addEventListener('DOMContentLoaded', () => {
  const toTopBtn = document.getElementById('toTopBtn');

  window.addEventListener('scroll', () => {
    const screenWidth = window.innerWidth;
    const scrollThreshold =
      screenWidth >= 768 && screenWidth < 1280 ? 500 : 300;

    if (window.scrollY > scrollThreshold) {
      toTopBtn.classList.add('is-visible');
    } else {
      toTopBtn.classList.remove('is-visible');
    }
  });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
