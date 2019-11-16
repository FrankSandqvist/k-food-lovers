import React, { useState } from "react";
import "./App.css";
import { products } from "./misc/products";
import { StartStage } from "./stages/start/StartStage";
import { CardFlickingStage } from "./stages/card-flicking/CardFlickingStage";
import { StatisticsStage } from "./stages/statistics/StatisticsStage";

export const App = () => {
  // const [currentProduct, setCurrentProduct] = useState(0);
  document.addEventListener(
    "touchmove",
    event => {
      event.preventDefault();
    },
    { passive: false }
  );

  const [stage, setStage] = useState(0);
  const [wastedProducts, setWastedProducts] = useState(null);

  if (stage === 0) {
    return (
      <StartStage
        onDone={() => {
          setStage(1);
        }}
      />
    );
  }

  if (stage === 1) {
    return (
      <CardFlickingStage
        onDone={wasted => {
          setWastedProducts(wasted);
          setStage(2);
        }}
        products={products}
      />
    );
  }

  if (stage === 2) {
    return (
      <StatisticsStage
        products={products}
        wastedProducts={wastedProducts}
        onReset={() => {
          setStage(0);
        }}
      />
    );
  }
};

export default App;
