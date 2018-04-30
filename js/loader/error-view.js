import AbstractView from '../utils/abstract-view';

class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<div class="error">${this.error}</div>`;
  }

  bind() {
    this.element.addEventListener(`click`, () => {
      this.element.remove();
    });
  }
}

export default ErrorView;
