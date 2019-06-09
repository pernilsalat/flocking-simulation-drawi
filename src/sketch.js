let img, flock, isLoop = false, weigthSlider;

function setup() {
  const canvas = createCanvas(710, 400);
  canvas.drop(gotFile);
  background(100);
  createP('weight of the lines');
  weigthSlider = createSlider(1, 10, 1);
}

function draw() {
  if (!img) {
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('Drag an image file onto the canvas.', width / 2, height / 2);
    text('press "p" to (un)pause and "s" to save', width / 2, height * 2 / 3);
    noLoop();
  } else {
    flock.run();
  }
}

function startFlockingSimulation() {
  const [x, y] = [random(width), random(height)];
  const windowPixels = windowHeight * windowWidth;
  const imgPixels = width * height;

  let boidNumber = 200;
  if (windowPixels / 3 > imgPixels) {
    boidNumber = 100;
  } else if (windowPixels * 2 / 3 > imgPixels) {
    boidNumber = 150;
  }

  background(50);
  flock = Flock();
  for (let i = 0; i < boidNumber; i++) {
    flock.addBoid(Boid(x, y));
  }
}

function keyPressed() {
  switch (key) {
    case 'p':
      if (isLoop) {
        isLoop = false;
        noLoop();
      } else {
        isLoop = true;
        loop();
      }
      break;
    case 's':
      saveCanvas();
      break;
    default:
      break;
  }
}
