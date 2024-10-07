export function* dijkstra(
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
  const openSet = [{ x: startX, y: startY, g: 0 }];
  const closedSet = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );
  const cameFrom = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );
  const gScore = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(Infinity)
  );

  gScore[startY][startX] = 0;

  const directions = [
    [0, -1], // up
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
  ];

  let stepsCounter = 0;
  setSteps([]);

  while (openSet.length > 0) {
    // sort openSet by gScore
    openSet.sort((a, b) => a.g - b.g);
    const { x, y } = openSet.shift();

    stepsCounter++;

    let currentStep = {
      stepNumber: stepsCounter,
      mainStep: `Evaluating cell (${x}, ${y}) with gScore ${gScore[y][x]}`,
      subSteps: [],
    };

    // set the cell as evaluated (closed)
    closedSet[y][x] = true;

    // paint the evaluated cell
    if (
      !(x === startX && y === startY) &&
      !(x === endCell.x && y === endCell.y)
    ) {
      drawCell(ctx, x * cellSize, y * cellSize, "palegreen");
    }

    yield;

    // check if the current cell is the goal
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
          mainStep: `Path found with length ${pathLength-2}`,
          subSteps: [],
        },
      ]);

      return;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < gridSize &&
        ny >= 0 &&
        ny < gridSize &&
        gridData[ny][nx] !== "#000"
      ) {
        // if neighbor is in closedSet, skip it
        if (closedSet[ny][nx]) {
          currentStep.subSteps.push(
            `Skipping neighbor (${nx}, ${ny}) as it is already evaluated.`
          );
          continue;
        }

        const tentativeGScore = gScore[y][x] + 1; // start to neighbor cost

        if (tentativeGScore < gScore[ny][nx]) {
          cameFrom[ny][nx] = { x, y };
          gScore[ny][nx] = tentativeGScore;

          if (!openSet.some((cell) => cell.x === nx && cell.y === ny)) {
            openSet.push({ x: nx, y: ny, g: gScore[ny][nx] });
            currentStep.subSteps.push(
              `Added neighbor (${nx}, ${ny}) to open set with gScore ${gScore[ny][nx]}`
            );
          } else {
            // update the openSet with new gScore
            const index = openSet.findIndex(
              (cell) => cell.x === nx && cell.y === ny
            );
            openSet[index].g = gScore[ny][nx];

            currentStep.subSteps.push(
              `Updated neighbor (${nx}, ${ny}) in open set with better gScore ${gScore[ny][nx]}`
            );
          }
        } else {
          currentStep.subSteps.push(
            `Not updating neighbor (${nx}, ${ny}) as current path is not better.`
          );
        }
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
      mainStep: "Open set is empty. No path found.",
      subSteps: [],
    },
  ]);
  alert("No path found");
}
