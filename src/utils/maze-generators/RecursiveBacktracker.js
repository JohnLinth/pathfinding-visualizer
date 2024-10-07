export const generateMaze = async (
  gridSize,
  gridData,
  ctx,
  cellSize,
  drawCell,
  animationSpeed = 1
) => {
  // init the grid (walls everywhere)
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      gridData.current[y][x] = "#000";
      drawCell(ctx, x * cellSize, y * cellSize, "#000");
    }
  }

  const stack = [];
  const visited = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );

  const startX = 1;
  const startY = 1;

  stack.push([startX, startY]);
  visited[startY][startX] = true;
  gridData.current[startY][startX] = "#fff";
  drawCell(ctx, startX * cellSize, startY * cellSize, "#fff");

  const directions = [
    [0, -2], // up
    [2, 0],  // right
    [0, 2],  // down
    [-2, 0], // left
  ];

  while (stack.length > 0) {
    const [x, y] = stack[stack.length - 1];

    // shuffle directions to randomize the maze
    directions.sort(() => Math.random() - 0.5);

    let carved = false;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx > 0 &&
        nx < gridSize - 1 &&
        ny > 0 &&
        ny < gridSize - 1 &&
        !visited[ny][nx]
      ) {
        // carve the path
        gridData.current[ny][nx] = "#fff";
        gridData.current[y + dy / 2][x + dx / 2] = "#fff";

        visited[ny][nx] = true;

        drawCell(ctx, nx * cellSize, ny * cellSize, "#fff");
        drawCell(
          ctx,
          (x + dx / 2) * cellSize,
          (y + dy / 2) * cellSize,
          "#fff"
        );

        if (animationSpeed > 0) {
          await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        }

        stack.push([nx, ny]);
        carved = true;
        break;
      }
    }

    if (!carved) {
      stack.pop();
    }
  }
};
