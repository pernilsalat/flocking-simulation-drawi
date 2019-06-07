function Flock() {
  const boids = [];
  return {
    run() {
      boids.forEach(boid => boid.run(boids));
    },
    addBoid(boid) {
      boids.push(boid);
    },
  };
}
