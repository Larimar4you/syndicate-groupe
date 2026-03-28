export const initScrollAnimations = () => {
  const proposalSection = document.querySelector('.proposal');
  const featuresList = document.querySelector('.proposal .features-list');
  const layers = document.querySelectorAll('.bg-layer');
  const cardImage = document.querySelector('.proposal .card-image');

  if (!proposalSection || !featuresList) return;

  // Анімація появи чекбоксів
  const appearanceObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          if (cardImage) cardImage.classList.add('is-visible');

          appearanceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  appearanceObserver.observe(featuresList);

  // Динамічний нахил шарів, коли секцію видно
  const handleLayerTilt = () => {
    const sectionRect = proposalSection.getBoundingClientRect();
    const sectionCenter = sectionRect.top + sectionRect.height / 2;
    const screenCenter = window.innerHeight / 2;
    const distance = sectionCenter - screenCenter; // Від центру екрана до центру секції (distance = 0 - центр)
    const tiltShift = distance * 0.015; // Сила нахилу

    layers.forEach((layer, index) => {
      const isFirstLayer = index === 0;
      const direction = isFirstLayer ? 1 : -1;
      const baseRotate = isFirstLayer ? 11 : -10; // Значення з макета

      // Коли центр екрана, результат = baseRotate
      layer.style.transform = `rotate(${baseRotate + tiltShift * direction}deg)`;
    });
  };

  // Перемикач події скролу
  const scrollTrigger = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleLayerTilt);
        } else {
          window.removeEventListener('scroll', handleLayerTilt);
        }
      });
    },
    { threshold: 0 }
  );

  scrollTrigger.observe(proposalSection);
};
