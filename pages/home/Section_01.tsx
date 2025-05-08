import Matter from 'matter-js';
import { useEffect, useRef } from 'react';
import Texture1 from '@/public/images/texture1.png';
import Texture2 from '@/public/images/texture2.png';
import Texture3 from '@/public/images/texture3.png';
import Texture4 from '@/public/images/texture4.png';
import Texture5 from '@/public/images/texture5.png';
import Texture6 from '@/public/images/texture6.png';

const baseVertices = [
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
const REFERENCE_WIDTH = 2000;
const REFERENCE_HEIGHT = 1200;

export default function Section_01({ screenType }: { screenType: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Composite, Common } =
      Matter;

    const textures = [Texture1, Texture2, Texture3, Texture4, Texture5, Texture6];
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    let engine: Matter.Engine | null = null;
    let render: Matter.Render | null = null;
    let runner: Matter.Runner | null = null;
    let world: Matter.World | null = null;
    let intervalId: NodeJS.Timeout | null = null;
    let ground: Matter.Body | null = null;
    let leftWall: Matter.Body | null = null;
    let rightWall: Matter.Body | null = null;

    textures.forEach((texture, i) => {
      const img = new Image();
      img.src = texture.src;
      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
        if (loadedCount === textures.length) {
          if (containerRef.current) {
            startMatter();
          }
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === textures.length) {
          if (containerRef.current) {
            startMatter();
          }
        }
      };
    });

    function startMatter() {
      if (!containerRef.current) return;

      engine = Engine.create();
      world = engine.world;
      engine.world.gravity.y = 4;

      const initialWidth = containerRef.current.offsetWidth;
      const initialHeight = containerRef.current.offsetHeight;

      if (initialWidth === 0 || initialHeight === 0) {
        return;
      }

      render = Render.create({
        element: containerRef.current!,
        engine: engine,
        options: {
          width: initialWidth,
          height: initialHeight,
          wireframes: false,
          background: 'transparent',
        },
      });

      const wallThickness = 60;

      function createWalls() {
        if (!world) return;
        if (ground) World.remove(world, [ground, leftWall!, rightWall!]);

        const width = containerRef.current?.offsetWidth || 0;
        const height = containerRef.current?.offsetHeight || 0;
        if (width === 0 || height === 0) return;

        ground = Bodies.rectangle(
          width / 2,
          height - (screenType === 'desktop' ? -wallThickness : 0),
          width + 100,
          screenType === 'desktop' ? wallThickness * 2 : -100,
          {
            isStatic: true,
            render: { visible: false },
          }
        );
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

      function createRigidBody(x: number, y: number): Matter.Body | null {
        if (loadedImages.length === 0) return null;

        const currentWidth = containerRef.current?.offsetWidth || REFERENCE_WIDTH;
        const currentHeight = containerRef.current?.offsetHeight || REFERENCE_HEIGHT;
        let scale = Math.max(
          0.1,
          (Math.sqrt(currentWidth * currentHeight) /
            Math.sqrt(REFERENCE_WIDTH * REFERENCE_HEIGHT)) *
            (screenType === 'desktop' ? 0.9 : 1.2)
        );

        const scaledVertices = baseVertices.map(v => ({
          x: v.x * scale,
          y: v.y * scale,
        }));

        if (scaledVertices.length < 3) return null;

        const texture = Common.choose(loadedImages);

        try {
          const body = Bodies.fromVertices(
            x,
            y,
            [scaledVertices],
            {
              friction: 0.3,
              restitution: 0.4,
              density: 0.008,
              render: {
                sprite: { texture: texture.src, xScale: scale, yScale: scale },
              },
            },
            true
          );
          return body;
        } catch (error) {
          console.error('Bodies.fromVertices 에러:', error);
          return null;
        }
      }

      let count = 0;
      const maxBodies = 14;

      intervalId = setInterval(() => {
        if (!containerRef.current || !world || count >= maxBodies) {
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
          return;
        }

        const currentWidth = containerRef.current.offsetWidth;
        if (currentWidth === 0) return;

        const scaleForBuffer = Math.max(0.1, currentWidth / REFERENCE_WIDTH);
        const minXVert = Math.min(...baseVertices.map(v => v.x));
        const maxXVert = Math.max(...baseVertices.map(v => v.x));
        const approxObjectWidth = (maxXVert - minXVert) * scaleForBuffer;
        const buffer = approxObjectWidth / 2 + 20; // 생성 위치 좌우 여백

        const minSpawnX = buffer;
        const maxSpawnX = currentWidth - buffer;

        if (minSpawnX >= maxSpawnX) return;
        const x = Common.random(minSpawnX, maxSpawnX);

        const y = -200;

        const body = createRigidBody(x, y);
        if (body) {
          World.add(world, body);
          count++;
        }
      }, 100);
      // ---

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.1, render: { visible: false } },
      });
      World.add(world, mouseConstraint);
      render.mouse = mouse;

      runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      const handleResize = () => {
        if (!containerRef.current || !render || !engine) return;
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        render.bounds.max.x = width;
        render.bounds.max.y = height;
        render.options.width = width;
        render.options.height = height;
        render.canvas.width = width;
        render.canvas.height = height;
        createWalls();
      };
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (render) Render.stop(render);
      if (runner) Runner.stop(runner);
      if (world) World.clear(world, false);
      if (engine) Engine.clear(engine);
      if (intervalId) clearInterval(intervalId);

      if (render && render.canvas && render.canvas.parentNode) {
        try {
          render.canvas.parentNode.removeChild(render.canvas);
        } catch (e) {
          console.warn('클린업 중 캔버스 제거 실패', e);
        }
      }
      if (render) render.textures = {};

      console.log('클린업 완료');
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
}
