export class DotNavigation {
  constructor(root, onSelect) {
    this.root = root;
    this.onSelect = onSelect;
    this.buttons = [];
    this.listeners = [];
  }

  render(count) {
    const normalizedCount = count > 0 ? count : 0;

    this.clear();

    for (let index = 0; index < normalizedCount; index += 1) {
      const button = document.createElement('button');
      const listener = () => this.onSelect(index);

      button.type = 'button';
      button.className = 'carousel-dot';
      button.setAttribute('aria-label', `Go to slide ${index + 1}`);
      button.addEventListener('click', listener);

      this.root.append(button);
      this.buttons.push(button);
      this.listeners.push(listener);
    }
  }

  clear() {
    this.buttons.forEach((button, index) => {
      const listener = this.listeners[index];

      if (listener) {
        button.removeEventListener('click', listener);
      }
    });

    this.root.textContent = '';
    this.buttons = [];
    this.listeners = [];
  }

  setActive(activeIndex) {
    this.buttons.forEach((button, index) => {
      const isActive = index === activeIndex;

      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  getCount() {
    return this.buttons.length;
  }

  destroy() {
    this.clear();
  }
}
