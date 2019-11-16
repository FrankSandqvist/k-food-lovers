import React, { useState } from "react";
import "./App.css";
import { Slider } from "./components/slider";
import { Card } from "@material-ui/core";
import { Statistics, Statistics2 } from "./func";

const products = [
  {
    id: "maito1",
    title: "Maito",
    imageURL: "https://",
    category: "dairy",
    price: 2.0
  },
  {
    id: "kaura2",
    title: "Kaura",
    imageURL: "https://",
    category: "vilja",
    price: 1.55
  },
  {
    id: "omena",
    title: "Omena",
    imageURL: "https://",
    category: "fruit",
    price: 24
  }
];

function App() {
  const [currentProduct, setCurrentProduct] = useState(0);

  return (
    <>
    <div className="App">
      <Slider
        item={products[currentProduct]}
        onDone={throwAwayPercentage => {
          // throwAwayPercentage do something
          setCurrentProduct(c => c + 1);
        }}
      />
    </div>
    <Card>
      <Statistics2 raw_data={products}/>
    </Card>
    </>
  );
}

export default App;
