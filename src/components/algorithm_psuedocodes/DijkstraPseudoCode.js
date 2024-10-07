import React from 'react';

const DijkstraPseudoCode = () => {
  return (
    <div className="p-6 mx-auto rounded-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">Pseudocode</h1>
      <div className="grid grid-cols-12 gap-1 p-4 font-mono text-sm border rounded-lg bg-slate-50">
        <div className="col-span-12 p-2 rounded-md bg-slate-200">
          <code className="text-blue-600">function Dijkstra(Graph, source)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>dist[source] = 0</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>for each vertex v in Graph</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>if v ≠ source</code>
        </div>

        <div className="col-span-3"></div>
        <div className="col-span-9">
          <code>dist[v] = ∞</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>prev[v] = undefined</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">Q = set of all vertices in Graph</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">while Q is not empty</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>u = vertex in Q with smallest dist[u]</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>remove u from Q</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>for each neighbor v of u</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>alt = dist[u] + length(u, v)</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>if alt &lt; dist[v]</code>
        </div>

        <div className="col-span-3"></div>
        <div className="col-span-9">
          <code>dist[v] = alt</code>
        </div>

        <div className="col-span-3"></div>
        <div className="col-span-9">
          <code>prev[v] = u</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">return dist[], prev[]</code>
        </div>
      </div>
    </div>
  );
};

export default DijkstraPseudoCode;
