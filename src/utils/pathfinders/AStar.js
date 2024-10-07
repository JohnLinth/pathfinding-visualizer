export function* aStar(
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
  const openSet = [{ x: startX, y: startY, f: 0 }];
  const closedSet = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );
  const cameFrom = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );
  const gScore = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(Infinity)
  );
  const fScore = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(Infinity)
  );

  gScore[startY][startX] = 0;
  fScore[startY][startX] = heuristic(startX, startY, endCell.x, endCell.y);

  const directions = [
    [0, -1], // up
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
  ];

  let stepsCounter = 0;
  setSteps([]);

  function heuristic(x1, y1, x2, y2) {
    // manhattan distance (|x1 - x2| + |y1 - y2|)
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  while (openSet.length > 0) {
    // sort openSet by fScore
    openSet.sort((a, b) => a.f - b.f);
    const { x, y } = openSet.shift();

    stepsCounter++;

    // create a currentStep object
    let currentStep = {
      stepNumber: stepsCounter,
      mainStep: `Evaluating cell (${x}, ${y}) with fScore ${fScore[y][x]}`,
      subSteps: [],
    };

    // set the cell as closed when evaluated
    closedSet[y][x] = true;

    // color the visiting cell
    if (
      !(x === startX && y === startY) &&
      !(x === endCell.x && y === endCell.y)
    ) {
      drawCell(ctx, x * cellSize, y * cellSize, "palegreen");
    }

    // yield after visualizing the current cell
    yield;

    // is current cell goal?
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

      // reconstruct the path
      let pathLength = 0;
      let curr = { x, y };
      while (curr) {
        if (
          !(curr.x === startX && curr.y === startY) &&
          !(curr.x === endCell.x && curr.y === endCell.y)
        ) {
          drawCell(ctx, curr.x * cellSize, curr.y * cellSize, "gold"); // gold color for now
        }
        curr = cameFrom[curr.y][curr.x];
        pathLength++;

        // yield after drawing each cell in the path
        yield;
      }
      setFinalPathLength(pathLength);

      // add final path length step
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

        const tentativeGScore = gScore[y][x] + 1; // cost from start to neighbor

        if (tentativeGScore < gScore[ny][nx]) {
          cameFrom[ny][nx] = { x, y };
          gScore[ny][nx] = tentativeGScore;
          fScore[ny][nx] =
            tentativeGScore + heuristic(nx, ny, endCell.x, endCell.y);

          if (!openSet.some((cell) => cell.x === nx && cell.y === ny)) {
            openSet.push({ x: nx, y: ny, f: fScore[ny][nx] });
            currentStep.subSteps.push(
              `Added neighbor (${nx}, ${ny}) to open set with fScore ${fScore[ny][nx]}`
            );
          } else {
            // update the openSet with new fScore
            const index = openSet.findIndex(
              (cell) => cell.x === nx && cell.y === ny
            );
            openSet[index].f = fScore[ny][nx];
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

    // yield after processing the current cell
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
  alert("No path found"); // alert for now
}
