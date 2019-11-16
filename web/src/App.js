import React, { useState } from "react";
import "./App.css";
import { Slider } from "./components/slider";

const products = [
  {
    id: "maito1",
    title: "Maito",
    imageURL: "https://",
    price: 2.0
  },
  {
    id: "kaura2",
    title: "Kaura",
    imageURL: "https://",
    price: 1.55
  },
  {
    id: "omena",
    title: "Omena",
    imageURL: "https://",
    price: 24
  }
];

function App() {
  const [currentProduct, setCurrentProduct] = useState(0);

  return (
    <div className="App">
      <Slider
        item={products[currentProduct]}
        onDone={throwAwayPercentage => {
          // throwAwayPercentage do something
          setCurrentProduct(c => c + 1);
        }}
      />
    </div>
  );
}

export default App;
