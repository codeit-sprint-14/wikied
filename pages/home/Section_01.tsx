import Matter from 'matter-js';
import { useEffect, useRef } from 'react';
import Texture1 from '@/public/images/texture1.png';
import Texture2 from '@/public/images/texture2.png';
import Texture3 from '@/public/images/texture3.png';
import Texture4 from '@/public/images/texture4.png';
import Texture5 from '@/public/images/texture5.png';
import Texture6 from '@/public/images/texture6.png';

// --- 객체 크기 조절 관련 설정 ---
const baseVertices = [
  // 사용자의 원본 정점 데이터
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
    console.log('Section_01 useEffect 시작'); // 확인용 로그

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
          console.log('이미지 로드 완료, startMatter 호출');
          if (containerRef.current) {
            startMatter();
          }
        }
      };
      img.onerror = () => {
        console.error(`이미지 로드 실패: ${texture.src}`);
        loadedCount++;
        if (loadedCount === textures.length) {
          console.log('일부 이미지 로드 실패, startMatter 호출 시도');
          if (containerRef.current) {
            startMatter();
          }
        }
      };
    });

    function startMatter() {
      if (!containerRef.current) return;
      console.log('startMatter 함수 실행');

      engine = Engine.create();
      world = engine.world;
      engine.world.gravity.y = 4;
      console.log(`중력 설정: ${engine.world.gravity.y}`);

      const initialWidth = containerRef.current.offsetWidth;
      const initialHeight = containerRef.current.offsetHeight;

      if (initialWidth === 0 || initialHeight === 0) {
        console.error('컨테이너 크기가 0입니다.');
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
          height - (screenType === 'desktop' ? wallThickness + 40 : -800), // Y 좌표
          width + 100, // 너비
          wallThickness * 2, // 높이
          {
            isStatic: true,
            render: { visible: false },
          }
        );
        leftWall = Bodies.rectangle(
          -wallThickness / 2, // X 좌표
          height / 2, // Y 좌표
          wallThickness, // 너비
          height * 2, // 높이
          {
            isStatic: true,
            render: { visible: false },
          }
        );
        rightWall = Bodies.rectangle(
          width + wallThickness / 2, // X 좌표
          height / 2, // Y 좌표
          wallThickness, // 너비
          height * 2, // 높이
          { isStatic: true, render: { visible: false } }
        );
        // ---

        World.add(world, [ground, leftWall, rightWall]);
      }

      createWalls(); // 초기 벽 생성

      // --- 화면 너비에 따라 크기가 조절되는 객체 생성 함수 ---
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
              // --- 사용자의 원본 물리 속성 사용 ---
              friction: 0.3,
              restitution: 0.4,
              density: 0.008,
              // ---
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
      // --- 객체 생성 함수 끝 ---

      let count = 0; // 생성된 객체 수 (원본 변수명)
      const maxBodies = 14;
      // --- 사용자의 원본 인터벌 시간 사용 ---
      intervalId = setInterval(() => {
        if (!containerRef.current || !world || count >= maxBodies) {
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
          return;
        }

        const currentWidth = containerRef.current.offsetWidth;
        if (currentWidth === 0) return;

        // 버퍼 계산 위한 스케일
        const scaleForBuffer = Math.max(0.1, currentWidth / REFERENCE_WIDTH);
        const minXVert = Math.min(...baseVertices.map(v => v.x));
        const maxXVert = Math.max(...baseVertices.map(v => v.x));
        const approxObjectWidth = (maxXVert - minXVert) * scaleForBuffer;
        const buffer = approxObjectWidth / 2 + 20; // 생성 위치 좌우 여백

        const minSpawnX = buffer;
        const maxSpawnX = currentWidth - buffer;

        // 원본 코드는 랜덤 범위를 150 ~ width-150 으로 고정했었음.
        // 스케일링된 객체 크기를 고려한 buffer 방식이 더 유연하지만,
        // 원본과 완전히 동일하게 하려면 아래 주석처리된 코드를 사용하세요.
        // const x = Common.random(150, currentWidth - 150);
        if (minSpawnX >= maxSpawnX) return; // 공간 없으면 생성 X
        const x = Common.random(minSpawnX, maxSpawnX);

        const y = -200; // 원본 y 좌표

        const body = createRigidBody(x, y);
        if (body) {
          World.add(world, body);
          count++;
        }
      }, 100); // 원본 인터벌 100ms
      // ---

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.1, render: { visible: false } }, // 원본 stiffness 값 확인 필요 (기억 안나면 0.1 유지)
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
        createWalls(); // 리사이즈 시 벽 재생성
      };
      window.addEventListener('resize', handleResize);

      // 클린업 함수에서 리스너 제거 위함
      // (startMatter 스코프 밖의 클린업 함수에서는 handleResize 직접 접근 불가)
      // => 클린업 로직에서 리스너 제거를 위해 ref 등을 사용하는 것이 더 견고함.
      // => 일단 원본 구조처럼 클린업은 useEffect 반환함수에서 처리.
    } // startMatter 함수 끝

    // --- 컴포넌트 언마운트 시 실행될 클린업 로직 ---
    return () => {
      console.log('useEffect 클린업 함수 실행');

      // 리사이즈 리스너 제거 - 주의: 이 방식은 불안정할 수 있음
      // window.removeEventListener('resize', handleResize); // handleResize 접근 불가

      if (render) Render.stop(render);
      if (runner) Runner.stop(runner);
      if (world) World.clear(world, false);
      if (engine) Engine.clear(engine);
      if (intervalId) clearInterval(intervalId);

      // 캔버스 제거 (render가 null 아닐 때만 시도)
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
    // --- 클린업 로직 끝 ---
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh', // 높이 확인!
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
}
