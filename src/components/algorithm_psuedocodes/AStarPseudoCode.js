import React from 'react';

const AStarPseudoCode = () => {
  return (
    <div className="p-6 mx-auto rounded-lg ">
      <h1 className="mb-4 text-2xl font-semibold text-center text-slate-800">Pseudocode</h1>
      <div className="grid grid-cols-12 gap-1 p-4 font-mono text-sm border rounded-lg bg-slate-50">
        <div className="col-span-12 p-2 rounded-md bg-slate-200">
          <code className="text-blue-600">function A* (start, goal)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>openSet = &#123;start&#125;</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>closedSet = &#123;&#125;</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>gScore[start] = 0</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>fScore[start] = heuristic(start, goal)</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">while openSet is not empty</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>current = node in openSet with lowest fScore</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>if current == goal</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>return reconstruct_path(cameFrom, current)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>remove current from openSet</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>add current to closedSet</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">for each neighbor of current</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>if neighbor in closedSet</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>continue</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>tentative_gScore = gScore[current] + d(current, neighbor)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>if tentative_gScore &lt; gScore[neighbor]</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>cameFrom[neighbor] = current</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>gScore[neighbor] = tentative_gScore</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)</code>
        </div>

        <div className="col-span-1"> </div>
        <div className="col-span-11">
          <code>if neighbor not in openSet</code>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-10">
          <code>add neighbor to openSet</code>
        </div>

        <div className="col-span-12 p-2 mt-4 rounded-md bg-slate-200">
          <code className="text-blue-600">return failure</code>
        </div>
      </div>
    </div>
  );
};

export default AStarPseudoCode;
