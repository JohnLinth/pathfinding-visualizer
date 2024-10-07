import React from 'react';

const DFSPseudoCode = () => {
  return (
    <div className="p-6 mx-auto rounded-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">Pseudocode</h1>
      <div className="grid grid-cols-12 gap-1 p-4 font-mono text-sm border rounded-lg bg-slate-50">
        <div className="col-span-12 p-2 rounded-md bg-slate-200">
          <code className="text-blue-600">function DFS(Graph, node)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>visited = set()</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>DFS-Recursive(Graph, node, visited)</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">function DFS-Recursive(Graph, node, visited)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>if node not in visited</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>visited.add(node)</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>for each neighbor in Graph[node]</code>
        </div>

        <div className="col-span-3"></div>
        <div className="col-span-9">
          <code>DFS-Recursive(Graph, neighbor, visited)</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">return visited</code>
        </div>
      </div>
    </div>
  );
};

export default DFSPseudoCode;
