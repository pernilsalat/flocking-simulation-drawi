let img, flock;

function setup() {
  const canvas = createCanvas(710, 400);
  canvas.drop(gotFile);
  background(100);

  flock = Flock();
  for (let i = 0; i < 100; i++) {
    flock.addBoid(Boid(random(width), random(height)));
  }
}

function draw() {
  if (!img) {
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('Drag an image file onto the canvas.', width / 2, height / 2);
    noLoop();
  } else {
    background(50);
    flock.run();
  }
}

function gotFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, function () {
      const imageRatio = img.height / img.width;
      let imageWidth = img.width, imageHeight = img.height;

      if (imageHeight > windowHeight) {
        imageHeight = windowHeight;
        imageWidth = imageHeight / imageRatio;
      }
      if (imageWidth > windowWidth) {
        imageWidth = windowWidth;
        imageHeight = imageWidth * imageRatio;
      }

      resizeCanvas(imageWidth, imageHeight);
      // image(img, 0, 0, imageWidth, imageHeight);
      loop();
    }).hide();
  } else {
    console.log('Not an image file!');
  }
}
