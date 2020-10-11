import { Universe, Cell } from 'gameOfLife';
import React, { useEffect, useRef, useState } from 'react';
import './GameOfLife.css';

type WasmGameOfLife = typeof import('gameOfLife');
interface GameOfLifeFPSProps{
  lastFrameTimeStamp: number
}
interface GameOfLifePlayPauseButtonProps{
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}


const GameOfLifeFPS: React.FC<GameOfLifeFPSProps> = (props) => {  
  const [frames] = useState<number[]>([]);
  const htmlFPS = useRef<HTMLDivElement>(null); // document.getElementById("fps");
  const setFPS = (htmlFPS: HTMLDivElement, framesCount: number, currentFps: number, sum: number, min: number, max: number) =>{
    if (htmlFPS) {
      let mean = sum / framesCount;
      htmlFPS.textContent = `
      Frames per Second:
               latest = ${Math.round(currentFps)}
      avg of last 100 = ${Math.round(mean)}
      min of last 100 = ${Math.round(min)}
      max of last 100 = ${Math.round(max)}
      `.trim();
    }
  }
  const getFPSStatistic = (frames: number[]) => {
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < frames.length; i++) {
      sum += frames[i];
      min = Math.min(frames[i], min);
      max = Math.max(frames[i], max);
    }
    return {min, max, sum};
  }
  const renderFPS = (htmlFPS: HTMLDivElement, frames: number[], now: number, lastFrameTimeStamp: number) =>{
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const delta = now - lastFrameTimeStamp;
    const fps = 1 / delta * 1000;
    // Save only the latest 100 timings.
    frames.push(fps);
    if (frames.length > 100) {
      frames.shift();
    }
    // Find the max, min, and mean of our 100 latest timings.
    let {min, max, sum} = getFPSStatistic(frames);
    setFPS(htmlFPS, frames.length, fps, sum, min, max);
  }
  useEffect(() => {
    if (frames.length === 0 || frames[frames.length - 1] !== props.lastFrameTimeStamp){
      renderFPS(htmlFPS.current as HTMLDivElement, frames, performance.now(), props.lastFrameTimeStamp);
    }
  });
  return  (<div className="fps" ref={htmlFPS}></div>);
}
const PlayPauseButton: React.FC<GameOfLifePlayPauseButtonProps> = (props) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    props.onClick(e);
    e.currentTarget.textContent = "▶" === e.currentTarget.textContent ? "⏸" : "▶";
  }
  return (<button onClick={onClick}>⏸</button>);
}

const GameOfLife: React.FC = () => {
  const UNIVERSE_SIZE = {width: 50, height: 50};
  const CELL_SIZE = 10; // px
  const GRID_COLOR = "#CCCCCC";
  const DEAD_COLOR = "#FFFFFF";
  const ALIVE_COLOR = "#000000";
  
  const htmlCanvas = useRef<HTMLCanvasElement>(null);
  const [wasm, setWasm] =  useState<WasmGameOfLife>();
  const [universe, setUniverse] =  useState<Universe>();
  const [memory, setMemory] =  useState<WebAssembly.Memory>();
  const [lastFrameTimeStamp, setLastFrameTimeStamp] = useState<number>(performance.now());
  const [animationId, setAnimationId] = useState<number | undefined>(performance.now());

  const asyncLoadWasm = async () => {
    try {
      const wasm = await import('gameOfLife');
      setWasm(wasm);
      setUniverse(wasm.Universe.new(UNIVERSE_SIZE.width, UNIVERSE_SIZE.height));
      const wasmBG = await import('gameOfLife/gameOfLife_bg.wasm');
      setMemory(wasmBG.memory);
    } catch (err) {
      console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
  }
  const setCanvas = (canvas: HTMLCanvasElement, universe: Universe) => {
    canvas.height = (CELL_SIZE + 1) * universe.height() + 1;
    canvas.width = (CELL_SIZE + 1) * universe.width() + 1;
  }
  const drawGrid = (canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;
  
    const drawLine = (ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) => {
      ctx.moveTo(x0,y0);
      ctx.lineTo(x1,y1);
    }
    const drawVerticalLine = (ctx: CanvasRenderingContext2D, x: number, y0: number, y1: number) => drawLine(ctx, x, y0, x, y1);
    for (let i = 0; i <= canvas.width; i++) {
      const x = i * (CELL_SIZE + 1) + 1, 
        y0 = 0,
        y1 = (CELL_SIZE + 1) * canvas.height + 1;
      drawVerticalLine(ctx, x, y0, y1);
    }
  
    const drawHorizontalLine = (ctx: CanvasRenderingContext2D, y: number, x0: number, x1: number) => drawLine(ctx, x0, y, x1, y);
    for (let j = 0; j <= canvas.height; j++) {
      const y = j * (CELL_SIZE + 1) + 1, 
        x0 = 0,
        x1 = (CELL_SIZE + 1) * canvas.width + 1;
      drawHorizontalLine(ctx, y, x0, x1);
    }
  
    ctx.stroke();
  };
  const drawCells = (canvas: HTMLCanvasElement, universe: Universe, wasm: WasmGameOfLife, memory: WebAssembly.Memory) => {
    let ctx = canvas.getContext('2d');
    if (!ctx || !universe || !memory) return;
    const cellsPtr = universe.cells();
    const [universeWidth, universeHeight] = [universe.width(), universe.height()];
    const cells = new Uint8Array(memory.buffer, cellsPtr, universeWidth * universeHeight);
    ctx.beginPath();

    const fillCell = (ctx: CanvasRenderingContext2D, row: number, col: number) => {
      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
    const getCoordinates = (index: number, border: {x: number, y: number}) => [Math.trunc(index % border.x), Math.trunc(index / border.y)];
    const fillCells = (ctx: CanvasRenderingContext2D, cells: Uint8Array, cellState: Cell, color: string, universe: Universe) =>{ 
      const [universeWidth, universeHeight] = [universe.width(), universe.height()];
      ctx.fillStyle = color;
      Array.from(Array(universeHeight * universeWidth).keys()).forEach(ind => {
        if (cells[ind] === cellState){
          let [col, row] = getCoordinates(ind, {x: universeWidth, y: universeHeight});//[Math.trunc(ind % universeWidth), Math.trunc(ind / universeHeight)];
          fillCell(ctx, row, col);
        }
      });
    }

    fillCells(ctx, cells, wasm.Cell.Alive, ALIVE_COLOR, universe);
    fillCells(ctx, cells, wasm.Cell.Dead, DEAD_COLOR, universe);

    ctx.stroke();
  }
  const renderLoop = (canvas: HTMLCanvasElement, universe: Universe, wasm: WasmGameOfLife, memory: WebAssembly.Memory) => { 
    if (!universe) return;
    drawGrid(canvas);
    const _renderLoop = () =>{
      setLastFrameTimeStamp(performance.now());//!!
      drawCells(canvas, universe, wasm, memory);
      universe.tick();
      setAnimationId(requestAnimationFrame(_renderLoop))
      //animationId = requestAnimationFrame(_renderLoop); 
    } 
    _renderLoop();
  };
  const play = (canvas: HTMLCanvasElement, universe: Universe, wasm: WasmGameOfLife, memory: WebAssembly.Memory) => {
    renderLoop(canvas, universe, wasm, memory);
  };
  const pause = () => {
    if (!animationId) return; //lol ts
    cancelAnimationFrame(animationId);
    setAnimationId(undefined);
  };
  const isPaused = () => !animationId;
  
  const canvasOnClick = (event: MouseEvent) => {
    let canvas = htmlCanvas.current as HTMLCanvasElement;
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), canvas.height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), canvas.width - 1);

    if (!universe) return;
    universe.toggle_cell(row, col);
    drawCells(canvas, universe, wasm as WasmGameOfLife, memory as WebAssembly.Memory);
  };

  const playPauseButtonOnClick = () => {
    if (isPaused()) {
      let canvas = htmlCanvas.current as HTMLCanvasElement;
      play(canvas, universe as Universe, wasm as WasmGameOfLife, memory as WebAssembly.Memory); //!!
    } else {
      pause();
    }
  };

  useEffect(() => {
     asyncLoadWasm();
  }, []);
  useEffect(() => {
    if (universe && memory && wasm){
      let canvas = htmlCanvas.current as HTMLCanvasElement;
      if (canvas)
      {
        setCanvas(canvas, universe);
        play(canvas, universe, wasm, memory);
        canvas.addEventListener('click', canvasOnClick);
      }
    }

  }, [universe, memory, wasm])
  return (
    <div className="GameOfLife">
      <PlayPauseButton onClick={playPauseButtonOnClick}/>  
      <GameOfLifeFPS lastFrameTimeStamp={lastFrameTimeStamp}/>
      <canvas ref={htmlCanvas} />
    </div>
  );
}


export default GameOfLife;
