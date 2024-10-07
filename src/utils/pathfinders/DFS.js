export function* dfs(
  startX,
  startY,
  ctx,
  gridData,
  cellSize,
  drawCell,
  setFinalPathLength,
  endCell,
  setSteps
) {
  const gridSize = gridData.length;
  const stack = [{ x: startX, y: startY }];
  const visited = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );
  const cameFrom = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  const directions = [
    [0, -1], // up
    [1, 0],  // right
    [0, 1],  // down
    [-1, 0], // left
  ];

  let stepsCounter = 0;
  setSteps([]);

  while (stack.length > 0) {
    const { x, y } = stack.pop();

    if (visited[y][x]) {
      continue;
    }

    visited[y][x] = true;
    stepsCounter++;

    let currentStep = {
      stepNumber: stepsCounter,
      mainStep: `Visiting cell (${x}, ${y})`,
      subSteps: [],
    };

    // paint the visiting cell
    if (
      !(x === startX && y === startY) &&
      !(x === endCell.x && y === endCell.y)
    ) {
      drawCell(ctx, x * cellSize, y * cellSize, "palegreen");
    }

    yield;

    // is current cell the goal cell?
    if (x === endCell.x && y === endCell.y) {

      setSteps((prevSteps) => [...prevSteps, currentStep]);


      setSteps((prevSteps) => [
        ...prevSteps,
        {
          stepNumber: stepsCounter + 1,
          mainStep: `Goal cell (${x}, ${y}) reached. Reconstructing path.`,
          subSteps: [],
        },
      ]);

      // reconstruct path
      let pathLength = 0;
      let curr = { x, y };
      while (curr) {
        if (
          !(curr.x === startX && curr.y === startY) &&
          !(curr.x === endCell.x && curr.y === endCell.y)
        ) {
          drawCell(ctx, curr.x * cellSize, curr.y * cellSize, "gold");
        }
        curr = cameFrom[curr.y][curr.x];
        pathLength++;

        yield;
      }
      setFinalPathLength(pathLength);

      setSteps((prevSteps) => [
        ...prevSteps,
        {
          stepNumber: stepsCounter + 2,
          mainStep: `Path found with length ${pathLength}`,
          subSteps: [],
        },
      ]);

      return;
    }

    // randomize directions for more interesting paths
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of shuffledDirections) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < gridSize &&
        ny >= 0 &&
        ny < gridSize &&
        gridData[ny][nx] !== "#000" &&
        !visited[ny][nx]
      ) {
        stack.push({ x: nx, y: ny });
        cameFrom[ny][nx] = { x, y };

        currentStep.subSteps.push(`Adding cell (${nx}, ${ny}) to the stack.`);
      } else if (
        nx >= 0 &&
        nx < gridSize &&
        ny >= 0 &&
        ny < gridSize &&
        visited[ny][nx]
      ) {
        currentStep.subSteps.push(
          `Skipping cell (${nx}, ${ny}) as it is already visited.`
        );
      } else if (
        nx >= 0 &&
        nx < gridSize &&
        ny >= 0 &&
        ny < gridSize &&
        gridData[ny][nx] === "#000"
      ) {
        currentStep.subSteps.push(`Encountered wall at cell (${nx}, ${ny}).`);
      }
    }

    setSteps((prevSteps) => [...prevSteps, currentStep]);

    yield;
  }

// if this is reached there was no path was found
  setSteps((prevSteps) => [
    ...prevSteps,
    {
      stepNumber: stepsCounter + 1,
      mainStep: "Stack is empty. No path found.",
      subSteps: [],
    },
  ]);
  alert("No path found");
}
