import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const StarField = () => {
  const canvasRef = useRef(null);

  const w = useRef(null);
  const h = useRef(null);

  const setCanvasExtents = useCallback(() => {
    w.current = document.body.clientWidth;
    h.current = document.body.clientHeight;
    canvasRef.current.width = w.current;
    canvasRef.current.height = h.current;
  }, []);

  const makeStars = (count) => {
    const out = [];
    for (let i = 0; i < count; i++) {
      const s = {
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      };
      out.push(s);
    }
    return out;
  };

  const stars = useRef(makeStars(10000));

  const clear = (c) => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const putPixel = (c, x, y, brightness) => {
    const intensity = brightness * 255;
    const rgb = 'rgb(' + intensity + ',' + intensity + ',' + intensity + ')';
    c.fillStyle = rgb;
    c.fillRect(x, y, 1, 1);
  };

  const moveStars = (distance) => {
    const count = stars.current.length;
    for (var i = 0; i < count; i++) {
      const s = stars.current[i];
      s.z += distance;
      while (s.z >= 1000) {
        s.z -= 1000;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', setCanvasExtents);
    return () => {
      window.removeEventListener('resize', setCanvasExtents);
    };
  }, [setCanvasExtents]);

  useEffect(() => {
    const c = canvasRef.current.getContext('2d');
    setCanvasExtents();

    const tick = (time) => {
      let elapsed = time - prevTime;
      prevTime = time;

      moveStars(elapsed * 0.05);

      clear(c);

      const cx = w.current / 2;
      const cy = h.current / 2;

      const count = stars.current.length;
      for (var i = 0; i < count; i++) {
        const star = stars.current[i];

        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= w.current || y < 0 || y >= h.current) {
          continue;
        }

        const d = star.z / 1000.0;
        const b = 1 - d * d;

        putPixel(c, x, y, b);
      }

      requestAnimationFrame(tick);
    };

    let prevTime, tickAnim;
    const init = (time) => {
      prevTime = time;
      tickAnim = window.requestAnimationFrame(tick);
    };

    const initAnim = window.requestAnimationFrame(init);

    return () => {
      window.cancelAnimationFrame(tickAnim);
      window.cancelAnimationFrame(initAnim);
    };
  });

  return <Canvas ref={canvasRef}></Canvas>;
};

export default StarField;
