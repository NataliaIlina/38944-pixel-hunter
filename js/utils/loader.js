const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const onError = (error) => {
  const node = document.createElement(`div`);
  node.style = `width: 180px;
                position: absolute;
                top: 50px;
                left: calc(50% - 90px);
                z-index: 20;
                padding: 20px;
                border-radius: 20px;
                margin: 0 auto;
                text-align: center;
                background-color: red;`;
  node.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, node);
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

// грузим данные
const loadData = () => {
  return fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((data) => data)
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
// предзагрузка изображений
const loadImages = (data) => {
  const urls = getImagesUrls(data);
  const promises = urls.map((url) => {
    return loadImage(url);
  });
  return Promise.all(promises);
};

export {loadData, loadImages};
