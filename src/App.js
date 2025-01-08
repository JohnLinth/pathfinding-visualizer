import { useRef, useState, useEffect } from "react";
import { generateMaze } from "./utils/maze-generators/RecursiveBacktracker.js";
import { dfs } from "./utils/pathfinders/DFS.js";
import { dijkstra } from "./utils/pathfinders/Dijkstra.js";
import { aStar } from "./utils/pathfinders/AStar.js";
import { bfs } from "./utils/pathfinders/BFS.js";
import Navbar from "./components/Navbar.js";
import AStarPseudoCode from "./components/algorithm_psuedocodes/AStarPseudoCode.js";
import DijkstraPseudoCode from "./components/algorithm_psuedocodes/DijkstraPseudoCode.js";
import DFSPseudoCode from "./components/algorithm_psuedocodes/DFSPseudoCode.js";
import BFSPseudoCode from "./components/algorithm_psuedocodes/BFSPseudoCode.js";
import AStarDescription from "./components/algorithm_descriptions/AStarDescription.js";
import DijkstraDescription from "./components/algorithm_descriptions/DijkstraDescription.js";
import DFSDescription from "./components/algorithm_descriptions/DFS.js";
import BFSDescription from "./components/algorithm_descriptions/BFS.js";
import Footer from "./components/Footer.js";
import ControlBar from "./components/ControlBar.js";
import AlgorithmSteps from "./components/AlgorithmSteps.js";
import GitHubIcon from "@mui/icons-material/GitHub";

const PathfindingGridApp = () => {
  // canvas ref and init
  const canvasRef = useRef(null);

  const [gridSize, setGridSize] = useState(51);
  const [cellSize, setCellSize] = useState(15);

  const gridData = useRef(
    Array.from({ length: gridSize }, () => Array(gridSize).fill("#fff"))
  );

  const [isPainting, setIsPainting] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [isMovingEnd, setIsMovingEnd] = useState(false);
  const [startCell, setStartCell] = useState({ x: 1, y: 1 });
  const [endCell, setEndCell] = useState({ x: gridSize - 2, y: gridSize - 2 });
  const [isRunning, setIsRunning] = useState(false);
  const [finalPathLength, setFinalPathLength] = useState(0);
  const [algorithm, setAlgorithm] = useState("A*");
  const [steps, setSteps] = useState([]);
  const isRunningRef = useRef(false);

  // generator refs
  const [algorithmGenerator, setAlgorithmGenerator] = useState(null);
  const generatorRef = useRef(null);

  // autoplay state vars
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(1); // Default speed in ms
  const autoplayIntervalRef = useRef(null);

  // utility to draw a cell on the canvas
  const drawCell = (
    ctx,
    x,
    y,
    color,
    drawBorder = true,
    shouldAnimate = false
  ) => {
    if (shouldAnimate) {
      animateCell(ctx, x, y, color);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, cellSize, cellSize);
    }

    if (drawBorder) {
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  };

  // draw start marker (chevron)
  const drawStartMarker = (ctx, x, y) => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + cellSize / 4, y + cellSize / 4);
    ctx.lineTo(x + (3 * cellSize) / 4, y + cellSize / 2);
    ctx.lineTo(x + cellSize / 4, y + (3 * cellSize) / 4);
    ctx.stroke();
  };

  // draw end marker (checkmark)
  const drawEndMarker = (ctx, x, y) => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + cellSize / 4, y + cellSize / 2);
    ctx.lineTo(x + cellSize / 2, y + (3 * cellSize) / 4);
    ctx.lineTo(x + (3 * cellSize) / 4, y + cellSize / 4);
    ctx.stroke();
  };

  // draw start cell
  const drawStartCell = (ctx) => {
    const x = startCell.x * cellSize;
    const y = startCell.y * cellSize;
    drawCell(ctx, x, y, "yellow", false);
    drawStartMarker(ctx, x, y);
  };

  // draw end cell
  const drawEndCell = (ctx) => {
    const x = endCell.x * cellSize;
    const y = endCell.y * cellSize;
    drawCell(ctx, x, y, "green", false);
    drawEndMarker(ctx, x, y);
  };

  // animate painting of a cell
  const animateCell = (ctx, x, y, color) => {
    let size = 0;
    const maxCellSize = cellSize;

    const drawFrame = () => {
      ctx.clearRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

      ctx.fillStyle = color;
      ctx.fillRect(
        x + (cellSize - size) / 2,
        y + (cellSize - size) / 2,
        size,
        size
      );

      if (size < maxCellSize) {
        size += 2;
        requestAnimationFrame(drawFrame);
      } else {
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);
      }
    };

    requestAnimationFrame(drawFrame);
  };

  // run the selected pathfinding algorithm
  const runPathfinding = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setFinalPathLength(0);
    setSteps([]);

    const algorithms = {
      DFS: dfs,
      Dijkstra: dijkstra,
      "A*": aStar,
      BFS: bfs,
    };

    const algorithmFunc = algorithms[algorithm];

    if (!algorithmFunc) {
      alert("Unknown algorithm");
      return;
    }

    const generator = algorithmFunc(
      startCell.x,
      startCell.y,
      ctx,
      gridData.current,
      cellSize,
      drawCell,
      setFinalPathLength,
      endCell,
      setSteps
    );

    setAlgorithmGenerator(generator);
    generatorRef.current = generator;
    setIsRunning(true);
  };

  // handle painting cells
  const handlePaint = (e, color) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const xIndex = Math.floor((e.clientX - rect.left) / cellSize);
    const yIndex = Math.floor((e.clientY - rect.top) / cellSize);

    // no painting over start or end cells
    if (
      (xIndex === startCell.x && yIndex === startCell.y) ||
      (xIndex === endCell.x && yIndex === endCell.y)
    ) {
      return;
    }

    // fill the cell only if it's not already the same color
    if (
      xIndex >= 0 &&
      xIndex < gridSize &&
      yIndex >= 0 &&
      yIndex < gridSize &&
      gridData.current[yIndex][xIndex] !== color
    ) {
      gridData.current[yIndex][xIndex] = color;
      const x = xIndex * cellSize;
      const y = yIndex * cellSize;

      const shouldAnimate = color === "#000"; // animate only black cells
      drawCell(ctx, x, y, color, true, shouldAnimate);
    }
  };

  const clearCell = (ctx, x, y) => {
    gridData.current[y][x] = "#fff";
    drawCell(ctx, x * cellSize, y * cellSize, "#fff");
  };

  // mouse event handlers
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);

    if (x === startCell.x && y === startCell.y) {
      setIsMovingStart(true);
    } else if (x === endCell.x && y === endCell.y) {
      setIsMovingEnd(true);
    } else {
      setIsPainting(true);
      const color = e.button === 0 ? "#000" : "#fff";
      handlePaint(e, color);
    }

    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isPainting) {
      const color = e.buttons === 1 ? "#000" : "#fff";
      handlePaint(e, color);
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    const ctx = canvasRef.current.getContext("2d");

    if (isMovingStart) {
      if (
        x >= 0 &&
        x < gridSize &&
        y >= 0 &&
        y < gridSize &&
        gridData.current[y][x] === "#fff"
      ) {
        clearCell(ctx, startCell.x, startCell.y);
        setStartCell({ x, y });
        drawStartCell(ctx);
      }
    } else if (isMovingEnd) {
      if (
        x >= 0 &&
        x < gridSize &&
        y >= 0 &&
        y < gridSize &&
        gridData.current[y][x] === "#fff"
      ) {
        clearCell(ctx, endCell.x, endCell.y);
        setEndCell({ x, y });
        drawEndCell(ctx);
      }
    }
  };

  const handleMouseUp = () => {
    setIsPainting(false);
    setIsMovingStart(false);
    setIsMovingEnd(false);
  };

  const renderGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const color = gridData.current[y][x];
        drawCell(ctx, x * cellSize, y * cellSize, color);
      }
    }

    drawStartCell(ctx);
    drawEndCell(ctx);
  };

  const handleGenerateMaze = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    await generateMaze(gridSize, gridData, ctx, cellSize, drawCell, 1);

    setStartCell({ x: 1, y: 1 });
    setEndCell({ x: gridSize - 2, y: gridSize - 2 });

    drawStartCell(ctx);
    drawEndCell(ctx);
  };

  const stepForward = () => {
    if (generatorRef.current) {
      const result = generatorRef.current.next();
      if (result.done) {
        setIsRunning(false);
        isRunningRef.current = false;
        generatorRef.current = null;
        setAlgorithmGenerator(null);
        stopAutoplay();
      }
    }
  };

  const resetAlgorithm = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    setAlgorithmGenerator(null);
    generatorRef.current = null;
    setFinalPathLength(0);
    setSteps([]);
    stopAutoplay();
    renderGrid();
  };

  const startAutoplay = () => {
    if (isRunningRef.current && !isAutoPlaying) {
      setIsAutoPlaying(true);
      autoplayIntervalRef.current = setInterval(() => {
        stepForward();
      }, autoplaySpeed);
    }
  };

  const stopAutoplay = () => {
    setIsAutoPlaying(false);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setAutoplaySpeed(newSpeed);
    if (isAutoPlaying) {
      stopAutoplay();
      startAutoplay();
    }
  };

  const skipToEnd = () => {
    if (generatorRef.current) {
      let result = generatorRef.current.next();
      while (!result.done) {
        result = generatorRef.current.next();
      }

      setIsRunning(false);
      isRunningRef.current = false;
      generatorRef.current = null;
      setAlgorithmGenerator(null);
      stopAutoplay();
    }
  };

  const handlePlayPauseClick = () => {
    if (!isRunningRef.current) {
      runPathfinding();
      isRunningRef.current = true;
      setIsRunning(true);
      startAutoplay();
    } else {
      if (isAutoPlaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    }
  };

  const clearGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    gridData.current = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill("#fff")
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderGrid();
  };

  // to stop autoplay when algorithm completes
  useEffect(() => {
    if (!isRunning && isAutoPlaying) {
      stopAutoplay();
    }
  }, [isRunning]);

  // for initial renderinbg of the grid
  useEffect(() => {
    renderGrid();
  }, [startCell, endCell]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    renderGrid();
  }, [gridSize, cellSize]);

  // maps for algorithm descriptions and pseudocodes
  const algorithmDescriptions = {
    "A*": AStarDescription,
    Dijkstra: DijkstraDescription,
    DFS: DFSDescription,
    BFS: BFSDescription,
  };

  const algorithmPseudoCodes = {
    "A*": AStarPseudoCode,
    Dijkstra: DijkstraPseudoCode,
    DFS: DFSPseudoCode,
    BFS: BFSPseudoCode,
  };

  const DescriptionComponent = algorithmDescriptions[algorithm];
  const PseudoCodeComponent = algorithmPseudoCodes[algorithm];

  return (
    <div>
      <Navbar />
      <ControlBar
        resetAlgorithm={resetAlgorithm}
        handlePlayPauseClick={handlePlayPauseClick}
        isAutoPlaying={isAutoPlaying}
        stepForward={stepForward}
        skipToEnd={skipToEnd}
        autoplaySpeed={autoplaySpeed}
        handleSpeedChange={handleSpeedChange}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        isRunning={isRunning}
        handleGenerateMaze={handleGenerateMaze}
        clearGrid={clearGrid}
        steps={steps}
      />

      <div className="flex flex-col p-8 md:flex-row">
        <canvas
          ref={canvasRef}
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
          style={{ border: "1px solid black", cursor: "pointer" }}
        />
        <AlgorithmSteps steps={steps} gridSize={gridSize} cellSize={cellSize} />
      </div>

      {/* algorithm desc */}
      <div className="px-7 mx-7 border-2 h-min-screen">
        <h1 className="my-3 text-3xl font-bold text-center">
          Selected Algorithm: {algorithm}
        </h1>
        <div className="flex justify-center">
          <a
            href="https://github.com/JohnLinth/pathfinding-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row px-3 py-2 space-x-2 rounded-lg bg-slate-300 hover:bg-slate-500"
          >
            <GitHubIcon /> <p>Check out this algorithm / site's code!</p>
          </a>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2">
            {DescriptionComponent && <DescriptionComponent />}
          </div>
          <div className="w-1/2">
            {PseudoCodeComponent && <PseudoCodeComponent />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PathfindingGridApp;
