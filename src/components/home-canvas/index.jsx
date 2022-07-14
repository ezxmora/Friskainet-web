import React, { useEffect, useRef } from 'react';
import { distance } from '../../Utils';
import Circle from './Circle';
import './style.scss'

let canvas;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

export default function HomeCanvas() {
  const canvasRef = useRef(null);
  const circles = [];

  useEffect(() => {
    canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    for (let i = 0; i < 50; i++) {
      let r = Math.floor(Math.random() * (20 - 10) + 10);
      let x = Math.random() * (innerWidth - r * 2) + r;
      let y = Math.random() * (innerHeight - r * 2) + r;

      if (i !== 0) {
        // We assure that balls don't spawn one over the other
        for (let j = 0; j < circles.length; j++) {
          if (distance(x, y, circles[j].x, circles[j].y) - r * 2 < 0) {
            r = Math.floor(Math.random() * (10 - 5) + 5);
            x = Math.random() * (innerWidth - r * 2) + r;
            y = Math.random() * (innerHeight - r * 2) + r;

            j = -1;
          }
        }
      }

      circles.push(new Circle(ctx, { x, y, r }));

    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        circle.update(circles);
      });
    }

    animate();

  }, [])

  return <canvas ref={canvasRef} id="fullscreen-home-canvas" />
}
