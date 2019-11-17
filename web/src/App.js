import React, { useState } from "react";
import "./App.css";
import { products } from "./misc/products";
import { StartStage } from "./stages/start/StartStage";
import { CardFlickingStage } from "./stages/card-flicking/CardFlickingStage";
import { StatisticsStage } from "./stages/statistics/StatisticsStage";

export const App = () => {
  document.addEventListener(
    "touchmove",
    event => {
      event.preventDefault();
    },
    { passive: false }
  );

  const [stage, setStage] = useState(0);
  const [wastedProducts, setWastedProducts] = useState(null);

  return (
    <div className="stage-container">
      {stage === 0 ? (
        <StartStage
          onDone={() => {
            setStage(1);
          }}
        />
      ) : stage === 1 ? (
        <CardFlickingStage
          onDone={wasted => {
            setWastedProducts(wasted);
            setStage(2);
          }}
          products={products}
        />
      ) : (
        <StatisticsStage
          products={products}
          wastedProducts={wastedProducts}
          onReset={() => {
            setStage(0);
          }}
        />
      )}
    </div>
  );
};

export default App;
