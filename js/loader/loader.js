import {checkStatus, onError, loadData} from './load-utils';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 30081986;
const DEFAULT_NAME = `unknown_raccoon`;

class Loader {
  static saveResults(data, name = DEFAULT_NAME) {
    const settings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, settings)
        .then(checkStatus)
        .catch((error) => onError(`Не удалось сохранить результаты текущей игры (${error})`));
  }

  static loadResults(name = DEFAULT_NAME) {
    return loadData(`${SERVER_URL}/stats/${APP_ID}-${name}`)
        .catch((error) => onError(`Произошла ошибка загрузки статистики (${error})`));
  }

  static loadQuestions() {
    return loadData(`${SERVER_URL}/questions`)
        .catch((error) => onError(`Произошла ошибка загрузки данных (${error})`));
  }
}

export default Loader;
