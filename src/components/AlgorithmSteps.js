import { useEffect, useRef, useState } from "react";
import { VariableSizeList } from "react-window";

function AlgorithmSteps({ steps, gridSize, cellSize }) {
  const [items, setItems] = useState([]);

  const listRef = useRef();

  useEffect(() => {
    if (steps && steps.length > 0) {
      // precompute item heights 
      const computedItems = steps.map((step) => {
        const subStepsCount = Array.isArray(step.subSteps) ? step.subSteps.length : 0;
        const BOTTOM_MARGIN = 8; // bottom margin for each step
        let height;

        // calculating based on constant heights
        switch (subStepsCount) {
          case 0:
            height = 76 + BOTTOM_MARGIN;
            break;
          case 1:
            height = 132 + BOTTOM_MARGIN;
            break;
          case 2:
            height = 180 + BOTTOM_MARGIN;
            break;
          case 3:
            height = 228 + BOTTOM_MARGIN;
            break;
          case 4:
            height = 276 + BOTTOM_MARGIN;
            break;
          default:
            height = 76 + subStepsCount * 50 + BOTTOM_MARGIN; // Fallback for more substeps
        }

        return { step, height };
      });

      // reverse so last step shown first
      setItems(computedItems.reverse());
    }
  }, [steps]);

  useEffect(() => {
    if (listRef.current && items.length > 0) {
      // scroll to the top
      listRef.current.scrollToItem(0);
    }
  }, [items]);

  const getItemSize = (index) => items[index]?.height || 0;

  return (
    <div className="w-full p-2 overflow-y-auto border border-slate-300">
      <h3 className="mb-4 text-lg font-bold">Algorithm Steps:</h3>
      {items.length > 0 ? (
        <VariableSizeList
          ref={listRef}
          height={gridSize * cellSize - 50} // adjusts height dynamically based on canvas size
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

  const { step } = item;

  return (
    <div key={index} style={style}>
      {/* main step */}
      <div className="flex flex-col p-3 mb-2 bg-white border-2 rounded-lg shadow">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <span className="inline-flex items-center justify-center w-12 h-12 font-semibold text-blue-600 bg-blue-100 rounded-full">
              {step.stepNumber}
            </span>
          </div>
          <div className="font-medium text-slate-700">{step.mainStep}</div>
        </div>
        {/* substeps */}
        {step.subSteps && step.subSteps.length > 0 && (
          <div className="pl-10 mt-2">
            {step.subSteps.map((subStep, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex items-center p-2 rounded-lg bg-slate-200">
                  <span className="text-slate-600">{subStep}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmSteps;
