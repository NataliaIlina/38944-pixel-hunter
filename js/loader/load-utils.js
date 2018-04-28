const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();

const onError = (error) => {
  const element = document.createElement(`div`);
  element.classList.add(`error`);
  element.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, element);
};

// получаем адреса картинок из данных
const getImagesUrls = (data) => {
  // все ответы
  const answers = data.map((item) => item.answers);
  const urls = [];
  // для каждого массива с ответами получаем url картинок
  answers.forEach((answer) => {
    answer.forEach((item) => {
      urls.push(item.image.url);
    });
  });
  return urls;
};

// грузим данные с адреса
const loadData = (url) => {
  return fetch(url)
      .then(checkStatus)
      .then(toJSON)
      .catch(onError);
};
// промис под одну картинку
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};

export {checkStatus, onError, loadData, getImagesUrls, loadImage};
