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

  width = Math.floor(width);
  height = Math.floor(height);

  return {width, height};
};

const frameSize = {
  'two-of-two': {width: 468, height: 458},
  'tinder-like': {width: 705, height: 455},
  'one-of-three': {width: 304, height: 455}
};

export {resize, frameSize};
