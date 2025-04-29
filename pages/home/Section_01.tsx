import Matter from 'matter-js';
import { useEffect, useRef } from 'react';
import Texture1 from '@/public/images/texture1.png';
import Texture2 from '@/public/images/texture2.png';
import Texture3 from '@/public/images/texture3.png';
import Texture4 from '@/public/images/texture4.png';
import Texture5 from '@/public/images/texture5.png';
import Texture6 from '@/public/images/texture6.png';

export default function Section_01() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Composite, Common } =
      Matter;

    const engine = Engine.create();
    const world = engine.world;
    engine.world.gravity.y = 4;
    const texturePaths = [Texture1, Texture2, Texture3, Texture4, Texture5, Texture6];

    const render = Render.create({
      element: containerRef.current!,
      engine: engine,
      options: {
        width: containerRef.current?.offsetWidth,
        height: containerRef.current?.offsetHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const wallThickness = 60;

    let ground = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    let leftWall = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    let rightWall = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });

    function createWalls() {
      World.remove(world, [ground, leftWall, rightWall]);

      const width = containerRef.current?.offsetWidth || 0;
      const height = containerRef.current?.offsetHeight || 0;

      ground = Bodies.rectangle(width / 2, height + wallThickness, width + 100, wallThickness * 2, {
        isStatic: true,
        render: { visible: false },
      });
      leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      });
      rightWall = Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        { isStatic: true, render: { visible: false } }
      );

      World.add(world, [ground, leftWall, rightWall]);
    }

    createWalls();

    const vertices = [
      { x: 65.43, y: 265.13 },
      { x: 44.13, y: 263.74 },
      { x: 24.23, y: 256.56 },
      { x: 7.4, y: 244.04 },
      { x: 0, y: 198.4 },
      { x: 1.8, y: 151.97 },
      { x: 15.57, y: 107.57 },
      { x: 33.96, y: 64.91 },
      { x: 65.42, y: 30.85 },
      { x: 104.27, y: 5.7 },
      { x: 150.25, y: 0 },
      { x: 195.94, y: 5.7 },
      { x: 234.4, y: 30.96 },
      { x: 265.35, y: 65.11 },
      { x: 283.43, y: 107.63 },
      { x: 297.47, y: 151.67 },
      { x: 300.76, y: 197.78 },
      { x: 298.18, y: 243.86 },
      { x: 280.79, y: 256.34 },
      { x: 259.83, y: 265.13 },
    ];

    function createRigidBody(x: number, y: number) {
      const texture = Common.choose(texturePaths);

      const body = Bodies.fromVertices(
        x,
        y,
        [vertices],
        {
          friction: 0.3,
          restitution: 0.4,
          density: 0.008,
          render: {
            sprite: {
              texture: texture.src,
              xScale: 1,
              yScale: 1,
            },
          },
        },
        true
      );

      return body;
    }

    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= 14) {
        clearInterval(intervalId);
        return;
      }
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      const x = Common.random(150, width - 150);
      const y = -200;
      const body = createRigidBody(x, y);
      if (body) {
        World.add(world, body);
        count++;
      }
    }, 100);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    function handleResize() {
      const width = containerRef.current?.offsetWidth || 0;
      const height = containerRef.current?.offsetHeight || 0;

      render.bounds.max.x = width;
      render.bounds.max.y = height;
      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;

      createWalls();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'absolute' }}
    />
  );
}
