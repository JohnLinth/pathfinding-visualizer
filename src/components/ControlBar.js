import ReplayIcon from "@mui/icons-material/Replay";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ControlBar = ({
  resetAlgorithm,
  handlePlayPauseClick,
  isAutoPlaying,
  stepForward,
  skipToEnd,
  autoplaySpeed,
  handleSpeedChange,
  algorithm,
  setAlgorithm,
  isRunning,
  handleGenerateMaze,
  clearGrid,
  steps
}) => {
  return (
    <div className="sticky top-0 z-50 flex justify-center p-4 bg-gray-100 shadow-md">
      <div className="flex items-center justify-between max-w-full space-x-10">
        <div>
          {/* reset */}
          <button onClick={resetAlgorithm} className="text-blue-700 hover:text-blue-800">
            <ReplayIcon />
          </button>

          {/* play pause */}
          <button onClick={handlePlayPauseClick} className="text-blue-700 hover:text-blue-800">
            {isAutoPlaying ? (
              <PauseCircleIcon style={{ fontSize: 60 }} />
            ) : (
              <PlayCircleIcon style={{ fontSize: 60 }} />
            )}
          </button>

            {/* step forward */}
          <button onClick={stepForward} className="text-blue-700 hover:text-blue-800">
            <NavigateNextIcon style={{ fontSize: 40 }} />
          </button>

          {/* skip to end */}
          <button onClick={skipToEnd} className="text-blue-700 hover:text-blue-800">
            <SkipNextIcon style={{ fontSize: 40 }} />
          </button>
        </div>

        <div className="text-center w-28">
          <p className="text-gray-500">Steps</p>
          <p className="flex justify-center text-2xl font-semibold text-center">
            {steps.length.toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: true })}
          </p>
        </div>

        {/* algorithm */}
        <div className="text-center">
          <p className="text-gray-500">Algorithm</p>
          <select
            id="algorithmSelect"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="A*">A* Search</option>
            <option value="Dijkstra">Dijkstra's Algorithm</option>
            <option value="DFS">Depth First Search</option>
            <option value="BFS">Breadth First Search</option>
          </select>
        </div>

        {/* sim speed */}
        <div className="text-center">
          <p className="text-gray-500">Simulation Speed</p>
          <select
            className="px-2 py-1 border border-gray-300 rounded"
            value={autoplaySpeed}
            onChange={handleSpeedChange}
          >
            <option value={1}>1000x (1ms)</option>
            <option value={10}>100x (10ms)</option>
            <option value={40}>25x (40ms)</option>
            <option value={100}>5x (100ms)</option>
            <option value={250}>2x (250ms)</option>
            <option value={500}>1x (500ms)</option>
          </select>
        </div>

        {/* Maze Generator */}
        <div className="text-center">
          <p className="text-gray-500">Maze</p>
          <button
            className="px-2 py-1 text-white bg-blue-700 rounded hover:bg-blue-800"
            onClick={handleGenerateMaze}
          >
            Generate Maze
          </button>
        </div>

        {/* Clear Grid */}
        <div className="text-center">
          <p className="text-gray-500">Grid</p>
          <button
            className="px-2 py-1 text-white bg-blue-700 rounded hover:bg-blue-800"
            onClick={clearGrid}
          >
            Clear Grid
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
