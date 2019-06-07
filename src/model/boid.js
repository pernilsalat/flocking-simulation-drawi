function Boid(x, y) {
  const position = createVector(x, y);
  const velocity = p5.Vector.random2D();
  const acceleration = createVector();
  const r = 3;
  const maxSpeed = 5;
  const maxForce = 0.05; // Maximum steering force

  function applyForce(force) {
    acceleration.add(force); // we could add mass here
  }

  function update() {
    velocity.add(acceleration).limit(maxSpeed);
    position.add(velocity);
    acceleration.set(0, 0);
  }

  function borders() {
    if (position.x < -r) position.x = width + r;
    if (position.y < -r) position.y = height + r;
    if (position.x > width + r) position.x = -r;
    if (position.y > height + r) position.y = -r;
  }

  function render() {
    // Draw a triangle rotated in the direction of velocity
    let theta = velocity.heading() + radians(90);
    fill(127);
    stroke(200);
    push();
    translate(position.x, position.y);
    rotate(theta);
    beginShape();
    vertex(0, -r * 2);
    vertex(-r, r * 2);
    vertex(r, r * 2);
    endShape(CLOSE);
    pop();
  }

  function flock(boids) {
    let sep = separate(boids);
    let ali = align(boids);
    let coh = cohesion(boids);

    // Arbitrarily weight these forces
    sep.mult(2);
    ali.mult(1.0);
    coh.mult(1.0);

    applyForce(sep);
    applyForce(ali);
    applyForce(coh);
  }

  function separate(boids) {
    const desiredSeparation = 625;
    const steer = createVector();
    let count = 0;

    boids.forEach(boid => {
      const distance = (position.x - boid.position.x) ** 2 + (position.y - boid.position.y) ** 2;
      if (distance && distance < desiredSeparation) {
        const diff = p5.Vector.sub(position, boid.position);
        diff.normalize();
        diff.div(distance);
        steer.add(diff);
        count++;
      }
    });
    if (count) {
      steer.div(count);
    }
    if (steer.x !== 0 && steer.y !== 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.setMag(maxSpeed);
      steer.sub(velocity);
      steer.limit(maxForce);
    }
    return steer;
  }

  function align(boids) {
    const neightborDist = 2500;
    const sum = createVector();
    let steer = createVector();
    let count = 0;

    boids.forEach(boid => {
      const distance = (position.x - boid.position.x) ** 2 + (position.y - boid.position.y) ** 2;
      if (distance && distance < neightborDist) {
        sum.add(boid.velocity);
        count++;
      }
    });
    if (count) {
      sum.div(count);
      sum.normalize();
      steer = p5.Vector.sub(sum, velocity);
      steer.limit(maxForce);
    }
    return steer;
  }

  function cohesion(boids) {
    const neightborDist = 2500;
    const sum = createVector();
    let count = 0;

    boids.forEach(boid => {
      const distance = (position.x - boid.position.x) ** 2 + (position.y - boid.position.y) ** 2;
      if (distance && distance < neightborDist) {
        sum.add(boid.position);
        count++;
      }
    });
    if (count) {
      sum.div(count);
    }
    return seek(sum);
  }

  function seek(target) {
    const desired = p5.Vector.sub(target, position).setMag(maxSpeed);
    // Steering = Desired minus Velocity
    return p5.Vector.sub(desired, velocity).limit(maxForce);
  }

  return {
    get position() { return position; },
    get velocity() { return velocity; },
    run(boids) {
      flock(boids);
      update();
      borders();
      render();
    }
  };
}