import astargif from "../../assets/astar.gif";

const AStarDescription = () => {
  return (
    <div className="p-6 mx-auto rounded-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">
        Description
      </h1>
      <p className="text-slate-700">
        <strong>A*</strong> is a super popular choice for pathfinding due to its
        efficiency and accuracy in finding the optimal path (next to Dijkstra).
        The A* algorithm always finds the shortest path. The algorithm works
        with weights, meaning it calculates the shortest path based on the
        cumulative cost of moving from one node to the next, considering the
        distance and any obstacles.
      </p>

      <p className="mt-3">
        The Youtube video series by <strong>Sebastian Lague</strong> on the A*
        algorithm was a large inspiration for this project. Please give it a
        watch if you're interested in learning more about the A* algorithm.
      </p>
      <a
        href="https://www.youtube.com/watch?v=-L-WgKMFuhE&list=PLFt_AvWsXl0cq5Umv3pMC9SPnKjfp9eGW"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Watch the series on YouTube
      </a>

      <div className="flex flex-col mt-4 px-44">
        <img
          src={astargif}
          alt="A* Algorithm Visualization"
          className="rounded-lg shadow-lg"
        />
        <p>
          <a
            href="https://www.youtube.com/watch?v=CgW0HPHqFE8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            A* (A-Star) Pathfinding Algorithm Visualization on a Real Map
          </a>
        </p>
      </div>

      <p className="mt-3">
        Navigation systems (like Google Maps) use the A* algorithm, or slightly
        modified versions of it, to find the shortest path between two points.
        The algorithm is also very commonly used in video games for AI
        pathfinding.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-slate-800">
        Key Characteristics:
      </h2>
      <ul className="mt-2 list-disc list-inside text-slate-700">
        <li>
          <strong>Guarantees shortest path:</strong> If the heuristic is
          admissible and consistent, A* guarantees the shortest path.
        </li>
        <li>
          <strong>Uses weights:</strong> A* takes in to account the cost (or
          weight) to move from one node to another.
        </li>
        <li>
          <strong>Heuristic function:</strong> A* uses a heuristic to estimate
          the cost from the current node to the goal, often employing Manhattan
          or Euclidean distance.
        </li>
        <li>
          <strong>Combines:</strong> A* is a combination of Dijkstra's algorithm
          (also viewable on this website) and a greedy best-first search.
        </li>
      </ul>
    </div>
  );
};

export default AStarDescription;
