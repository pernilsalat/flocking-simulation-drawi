let img;

function setup() {
  const c = createCanvas(710, 400);
  background(100);
  c.drop(gotFile);
}

function draw() {
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width / 2, height / 2);
  noLoop();
}

function gotFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, function () {
      background(255);
      // imageMode(CENTER);
      resizeCanvas(img.width, img.height);
      image(img, 0, 0);
    }).hide();
  } else {
    console.log('Not an image file!');
  }
}
