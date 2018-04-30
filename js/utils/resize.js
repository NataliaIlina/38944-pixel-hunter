const resize = (frame, image) => {
  let width = image.width;
  let height = image.height;

  const ratio = width / height;

  if (width > frame.width) {
    width = frame.width;
    height = width / ratio;
  }
  if (height > frame.height) {
    height = frame.height;
    width = height * ratio;
  }

  width = Math.floor(width);
  height = Math.floor(height);

  return {width, height};
};

export {resize};
