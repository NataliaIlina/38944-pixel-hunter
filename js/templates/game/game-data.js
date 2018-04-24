const Initial = {
  LEVEL: 0,
  TIME: 30,
  LIVES: 3
};

const INITIAL_GAME = Object.freeze({
  level: Initial.LEVEL,
  time: Initial.TIME,
  lives: Initial.LIVES
});

const GAME_LEVELS = [
  {
    type: `two-images`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `paint`
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      }
    ]
  },
  {
    type: `one-image`,
    question: `Угадай, фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]
  },
  {
    type: `three-images`,
    question: `Найдите рисунок среди изображений`,
    images: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        type: `photo`
      }
    ],
    answer: `paint`
  },
  {
    type: `two-images`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `paint`
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      }
    ]
  },
  {
    type: `one-image`,
    question: `Угадай, фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]
  },
  {
    type: `three-images`,
    question: `Найдите рисунок среди изображений`,
    images: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        type: `photo`
      }
    ],
    answer: `paint`
  },
  {
    type: `two-images`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `paint`
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      }
    ]
  },
  {
    type: `one-image`,
    question: `Угадай, фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]
  },
  {
    type: `three-images`,
    question: `Найдите рисунок среди изображений`,
    images: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        type: `photo`
      }
    ],
    answer: `paint`
  },
  {
    type: `two-images`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `paint`
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      }
    ]
  }
];


export {Initial, GAME_LEVELS, INITIAL_GAME};
