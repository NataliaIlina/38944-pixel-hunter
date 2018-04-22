const resize = (frame, image) => {
  let width = image.width;
  let height = image.height;

  const ratio = width / height;

  if (width > height) {
    if (width > frame.width) {
      width = frame.width;
      height = width / ratio;
      if (height > frame.height) {
        height = frame.height;
        width = height * ratio;
      }
    }
  } else {
    if (height > frame.height) {
      height = frame.height;
      width = height * ratio;
      if (width > frame.width) {
        width = frame.width;
        height = width / ratio;
      }
    }
  }
  return {width, height};
};

export {resize};
