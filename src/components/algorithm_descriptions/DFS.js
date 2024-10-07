const DFSDescription = () => {
  return (
    <div className="p-6 mx-auto rounded-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">
        Algorithm Description
      </h1>
      <p className="text-slate-700">
        Depth-First Search (DFS) is unweighted and does not guarantee the
        shortest path. It works by exploring as far (deep) as possible along
        each branch before backtracking if it doesnt find the goal. It is often
        used for traversal in trees and graphs where finding any path (not
        necessarily the shortest) is sufficient. Check out his brother
        Breadth-First Search (BFS), its also on this site!
      </p>

      <h2 className="mt-4 text-xl font-semibold text-slate-800">
        Key Characteristics:
      </h2>
      <ul className="mt-2 list-disc list-inside text-slate-700">
        <li>
          <strong>Unweighted</strong> DFS is typically used in unweighted
          graphs, and it doesn't consider weights when choosing paths.
        </li>
        <li>
          <strong>Does not guarantee shortest path:</strong> DFS was not
          designed to find the shortest path, as it explores deeper paths first.
        </li>
        <li>
          <strong>Explores depth first:</strong> DFS dives deep into the graph
          or tree, exploring each branch fully before backtracking to explore
          other branches. This is very observable in the visualization if you
          generate a maze and observe the path it takes.
        </li>
        <li>
          <strong>Stack-based approach:</strong> DFS uses a stack to manage the
          nodes being explored.
        </li>
      </ul>

      <p className="mt-4 text-slate-700">
        DFS is popular for applications like maze-solving, topological
        sorting, and detecting cycles in graphs, where the goal is not
        necessarily the shortest path but rather finding any solution.
      </p>
    </div>
  );
};

export default DFSDescription;
