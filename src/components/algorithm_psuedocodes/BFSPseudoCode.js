import React from 'react';

const BFSPseudoCode = () => {
  return (
    <div className="p-6 mx-autorounded-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">Pseudocode</h1>
      <div className="grid grid-cols-12 gap-1 p-4 font-mono text-sm border rounded-lg bg-slate-50">
        <div className="col-span-12 p-2 rounded-md bg-slate-200">
          <code className="text-blue-600">function BFS(Graph, start)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>queue = [start]</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>visited = set()</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>visited.add(start)</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">while queue is not empty</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>node = queue.pop(0)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>for each neighbor in Graph[node]</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>if neighbor not in visited</code>
        </div>

        <div className="col-span-3"></div>
        <div className="col-span-9">
          <code>visited.add(neighbor)</code>
        </div>

        <div className="col-span-3"></div>
        <div className="col-span-9">
          <code>queue.push(neighbor)</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">return visited</code>
        </div>
      </div>
    </div>
  );
};

export default BFSPseudoCode;
