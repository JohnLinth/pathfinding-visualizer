const DijkstraDescription = () => {
  return (
    <div className="p-6 mx-auto rounded-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">
        Description
      </h1>
      <p className="text-slate-700">
        Dijkstra's algorithm always delivers the shortest path. It works with
        weighted graphs, where the weight (or cost) between nodes determines the
        shortest path. The algorithm explores all possible paths, ensuring the
        path with the smallest cumulative cost is found.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-slate-800">
        Key Characteristics:
      </h2>
      <ul className="mt-2 list-disc list-inside text-slate-700">
        <li>
          <strong>Guarantees shortest path:</strong> Dijkstra's
          guarantees the shortest path (so long as all weights are non-negative).
        </li>
        <li>
          <strong>Uses weights:</strong> Considers the weight or
          cost between nodes when determining the shortest path.
        </li>
        <li>
          <strong>Works with graphs:</strong> Dijkstra's was designed to work with both
          undirected and directed graphs.
        </li>
        <li>
          <strong>Explores all nodes:</strong> Dijkstra's algorithm explores all
          nodes, updating the shortest known distance for each, ensuring it
          finds the optimal path.
        </li>
      </ul>
    </div>
  );
};

export default DijkstraDescription;
