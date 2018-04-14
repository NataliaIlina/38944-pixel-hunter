const LevelType = {
  FIRST: {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    images: {
      paint: `https://k42.kn3.net/CF42609C8.jpg`,
      photo: `http://i.imgur.com/1KegWPz.jpg`
    },
    answers: {
      question1: `paint`,
      question2: `photo`
    }
  },
  SECOND: {
    task: `Угадай, фото или рисунок?`,
    images: {
      photo: `https://i.imgur.com/DiHM5Zb.jpg`
    },
    answers: {
      question1: `photo`,
    }
  },
  THIRD: {
    task: `Найдите рисунок среди изображений`,
    images: {
      photo: `https://i.imgur.com/DiHM5Zb.jpg`,
      paint: `https://k42.kn3.net/D2F0370D6.jpg`
    },
    answers: {
      question1: `photo`,
    }
  }
};

const initialState = {
  time: 30,
  lives: 3,
  victory: false
};

export {initialState, LevelType};
