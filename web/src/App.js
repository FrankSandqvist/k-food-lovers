import React from "react";
import "./App.css";
import { Cards } from "./components/Cards";

const products = [
  {
    id: "maito1",
    title: "Maito",
    imageURL:
      "https://foodieimages.s3.amazonaws.com/images/entries/320x480/6415712506032_0.png",
    price: 2.0,
    category: "dairy"
  },
  {
    id: "kaura2",
    title: "Kaura",
    imageURL:
      "https://www.myllynparas.fi/sites/default/files/styles/article_image/public/thumbnails/image/Kaura-h%C3%A4rk%C3%A4papurouhe_0.jpg?itok=IEhU_dgH",
    price: 1.55,
    category: "grain"
  },
  {
    id: "omena",
    title: "Omena",
    imageURL:
      "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
    price: 24,
    category: "fruit"
  }
];

function App() {
  // const [currentProduct, setCurrentProduct] = useState(0);
  document.addEventListener("touchmove", event => {
    event.preventDefault();
  }, {passive: false});

  document.addEventListener("touchstart", event => {
    event.preventDefault();
  }, {passive: false});

  return (
    <Cards
      itemImages={products.map(i => i.imageURL)}
      onDone={(index, percentage) => {
        // throwAwayPercentage do something
        // setCurrentProduct(c => c + 1);
      }}
    />
  );
}

export default App;
