const resize = (frame, image) => {
  let width = image.width;
  let height = image.height;

  const ratio = width / height;

  width = frame.width;
  height = width / ratio;
  if (height > frame.height) {
    height = frame.height;
    width = height * ratio;
  }

  return {width, height};
};

export {resize};
