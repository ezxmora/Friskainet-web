import { distance, resolveCollision } from '../../Utils';

const colors = [
  '#F20587',
  '#2E038C',
  '#F2B705',
  '#F28705',
  '#BF3604',
]

export default class Circle {
  constructor(context, { x, y, r }) {
    this.c = context;
    this.radius = r;
    this.x = x
    this.y = y
    this.mass = 1;
    this.velocity = {
      x: (Math.random()) * 0.2,
      y: (Math.random()) * 0.2,
    }
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  #draw() {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.strokeStyle = '#000000';
    this.c.stroke();
    this.c.closePath();
  }

  update(particles) {

    this.#draw();

    // Bouncing back in the walls
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }

    // Detecting collisions
    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;

      if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
        resolveCollision(this, particles[i]);
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }

  }
}
