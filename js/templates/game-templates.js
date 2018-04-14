import {LevelType} from '../data/data.js';

const templateFirst = (level) => {
  return `<div class="game">
    <p class="game__task">${level.task}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${level.images.paint}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${level.images.photo}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </div>`;
};

const templateSecond = (level) => {
  return `<div class="game">
  <p class="game__task">${level.task}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${level.images.photo}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </div>`;
};

const templateThird = (level) => {
  return `<div class="game">
    <p class="game__task">${level.task}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${level.images.paint}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${level.images.photo}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${level.images.photo}" alt="Option 1" width="304" height="455">
      </div>
    </form>
  </div>`;
};

// шаблоны хочется связать с объектами для заполнения
const templates = [
  {
    type: templateFirst,
    level: LevelType.FIRST
  },
  {
    type: templateSecond,
    level: LevelType.SECOND
  },
  {
    type: templateThird,
    level: LevelType.THIRD
  }
];


export default templates;
