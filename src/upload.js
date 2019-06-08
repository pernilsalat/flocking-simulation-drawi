function gotFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, function (image) {
      let { imageWidth, imageHeight } = getResizedDimensions(image);

      resizeCanvas(imageWidth, imageHeight);
      image.resize(imageWidth, imageHeight);
      image.loadPixels();
      img = image;
      isLoop = true;

      startFlockingSimulation();
      loop();
    });
  } else {
    console.log('Not an image file!');
  }
}

function getResizedDimensions(image) {
  const imageRatio = image.height / image.width;
  let imageWidth = image.width, imageHeight = image.height;

  if (imageHeight > windowHeight) {
    imageHeight = windowHeight;
    imageWidth = imageHeight / imageRatio;
  }
  if (imageWidth > windowWidth) {
    imageWidth = windowWidth;
    imageHeight = imageWidth * imageRatio;
  }
  return { imageWidth, imageHeight };
}
