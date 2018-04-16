const LevelType = {
  FIRST: {
    task: `Угадайте для каждого изображения фото или рисунок?`,
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
  SECOND: {
    task: `Угадай, фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]
  },
  THIRD: {
    task: `Найдите рисунок среди изображений`,
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
  }
};

const initialState = {
  time: 30,
  lives: 3,
  victory: false,
  answers: []
};

const totalResults = [
  {
    time: 30,
    lives: 2,
    victory: true,
    answers: new Array(10).fill({isCorrect: true, time: 25}, 0, 5).fill({isCorrect: true, time: 7}, 5, 7).fill({isCorrect: true, time: 15}, 7, 10)
  },
  {
    time: 30,
    lives: 0,
    victory: false,
    answers: new Array(3).fill({isCorrect: false, time: 20})
  },
  {
    time: 30,
    lives: 1,
    victory: true,
    answers: new Array(10).fill({isCorrect: true, time: 18})
  }
];

export {initialState, LevelType, totalResults};
