export class DotNavigation {
  constructor(root, onSelect) {
    this.root = root;
    this.onSelect = onSelect;
    this.buttons = [];
    this.listeners = [];
  }

  /**
   * Rebuilds dot buttons for the requested slide count.
   * @param {number} count - Dot count.
   * @returns {void}
   */
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

  /**
   * Removes existing dots and registered listeners.
   * @returns {void}
   */
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

  /**
   * Marks active dot.
   * @param {number} activeIndex - Logical index to activate.
   * @returns {void}
   */
  setActive(activeIndex) {
    this.buttons.forEach((button, index) => {
      const isActive = index === activeIndex;

      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  /**
   * Returns currently rendered dot count.
   * @returns {number} Dot count.
   */
  getCount() {
    return this.buttons.length;
  }

  /**
   * Disposes the navigation instance.
   * @returns {void}
   */
  destroy() {
    this.clear();
  }
}
