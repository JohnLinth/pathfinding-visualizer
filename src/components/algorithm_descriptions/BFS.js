const BFSDescription = () => {
  return (
    <div className="p-6 mx-autorounded-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">
        Algorithm Description
      </h1>
      <p className="text-slate-700">
        Breadth-First Search (BFS) is an unweighted algorithm that does not
        guarantee the shortest path in weighted graphs. However, in an
        unweighted grid or graph, BFS does find the shortest path, as it
        explores all nodes level by level. As the name implies, BFS searches
        with breadth, visiting all neighbor nodes first instead of diving deep
        in to branches. Check out his brother Depth-First Search (DFS), its also
        on this site!
      </p>

      <h2 className="mt-4 text-xl font-semibold text-slate-800">
        Key Characteristics:
      </h2>
      <ul className="mt-2 list-disc list-inside text-slate-700">
        <li>
          <strong>Unweighted</strong> BFS is typically used in
          unweighted graphs, exploring nodes based on distance rather than
          weights.
        </li>
        <li>
          <strong>Finds shortest path:</strong> BFS guarantees the shortest path
          in an unweighted graph by visiting nodes level by level. (not in a weighted one though)
        </li>
        <li>
          <strong>Explores neighbors first:</strong> The algorithm explores all
          neighbors of a node before moving to the next level, ensuring that the
          closest nodes are visited first. This is very observable in the visualization if you
          generate a maze and observe the path it takes.
        </li>
        <li>
          <strong>Queue-based approach:</strong> BFS uses a queue data structure
          to keep track of nodes to explore in a breadth-first manner.
        </li>
      </ul>

      <p className="mt-4 text-slate-700">
        BFS is popular for scenarios like solving mazes, finding connected
        components, or searching through a network where uniform edge weights
        are assumed.
      </p>
    </div>
  );
};

export default BFSDescription;
