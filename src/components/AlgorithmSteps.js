import { useEffect, useRef } from "react";
import { VariableSizeList } from "react-window";

function AlgorithmSteps({ steps, gridSize, cellSize }) {
  const MAIN_STEP_HEIGHT = 70;
  const SUBSTEP_HEIGHT = 50;

  const items = [];

  const reversedSteps = [...steps].reverse();

  reversedSteps.forEach((step) => {
    items.push({ type: "main", step });
    if (step.subSteps && step.subSteps.length > 0) {
      step.subSteps.forEach((subStep) => {
        items.push({ type: "sub", subStep });
      });
    }
  });

  // get the height of each item
  const getItemSize = (index) => {
    const item = items[index];
    if (!item) {
      return MAIN_STEP_HEIGHT;
    }
    return item.type === "main" ? MAIN_STEP_HEIGHT : SUBSTEP_HEIGHT;
  };

  // ref to the list to control scrolling
  const listRef = useRef();

  // scroll to top when items updates
  useEffect(() => {
    if (listRef.current && items.length > 0) {
      listRef.current.scrollToItem(0);
    }
  }, [items]);

  return (
    <div
      className="w-full p-2 overflow-y-auto border border-slate-300 overscroll-none"
      style={{ maxHeight: gridSize * cellSize }}
    >
      <h3 className="mb-4 text-lg font-bold">Algorithm Steps:</h3>
      {items.length > 0 ? (
        <VariableSizeList
          ref={listRef}
          height={gridSize * cellSize - 50}
          width={"100%"}
          itemCount={items.length}
          itemSize={getItemSize}
          itemData={items}
        >
          {Row}
        </VariableSizeList>
      ) : (
        <p>No steps to display.</p>
      )}
    </div>
  );
}

const Row = ({ index, style, data }) => {
  const item = data[index];
  if (!item) {
    return null;
  }
  if (item.type === "main") {
    const { step } = item;
    return (
      <div style={style} className="mb-2 ">
        {/* parent */}
        <div className="flex items-center p-3 bg-white rounded-lg shadow">
          <div className="flex-shrink-0 mr-3">
            <span className="inline-flex items-center justify-center w-8 h-8 font-semibold text-blue-600 bg-blue-100 rounded-full">
              {step.stepNumber}
            </span>
          </div>
          <div className="font-medium text-slate-700">{step.mainStep}</div>
        </div>
      </div>
    );
  } else if (item.type === "sub") {
    const { subStep } = item;
    return (
      <div style={style} className="mb-2 ml-12">
        <div className="flex items-center p-2 rounded-lg bg-slate-50">
          <span className="text-slate-600">{subStep}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default AlgorithmSteps;
