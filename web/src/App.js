import React, { useState, useEffect } from "react";
import "./App.css";
import { Cards } from "./components/Cards";

const expiredProducts = [
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
    price: 5,
    category: "grain"
  },
  {
    id: "omena",
    title: "Omena",
    imageURL:
      "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
    price: 2.0,
    category: "fruit"
  }
];

function App() {
  // const [currentProduct, setCurrentProduct] = useState(0);
  document.addEventListener(
    "touchmove",
    event => {
      event.preventDefault();
    },
    { passive: false }
  );

  document.addEventListener(
    "touchstart",
    event => {
      event.preventDefault();
    },
    { passive: false }
  );

  const [flash, setFlash] = useState(null);
  const [flickedStuff, setFlickedStuff] = useState([]);

  const allFlicked = flickedStuff.length === expiredProducts.length;
  const wastedMoney = flickedStuff
    .reduce((acc, p) => {
      acc = acc + p.wastedMoney;
      return acc;
    }, 0);

  return (
    <>
      {flash && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "5rem",
            zIndex: 1000,
            opacity: 0,
            pointerEvents: "none",
            animation: "flash 1s",
            animationFillMode: "forward"
          }}
        >
          {{ BAD: "😱", GOOD: "😋" }[flash]}
        </div>
      )}
      {allFlicked ? (
        <div
          style={{
            height: '100%',
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "2rem",
            animation: "appear 2s",
            animationFillMode: "forward"
          }}
        >
          {wastedMoney === 0
            ? "YOU ROCK!"
            : "💸 You just threw away " + wastedMoney.toFixed(2) + " € "}
        </div>
      ) : (
        <Cards
          itemImages={expiredProducts.map(i => i.imageURL)}
          onFlick={(index, dir, mode) => {
            // throwAwayPercentage do something
            // setCurrentProduct(c => c + 1);
            if (dir === -1) {
              setFlash(null);
              setFlash("BAD");
              const wastePercentage = {
                ALMOST_ALL: 0.8,
                ABOUT_HALF: 0.5,
                SOME_LEFT: 0.2
              }[mode];
              const originalProduct = expiredProducts[index];
              setFlickedStuff(t => [
                ...t,
                {
                  ...originalProduct,
                  wastedMoney: originalProduct.price * wastePercentage
                }
              ]);
            }
            if (dir === 1) {
              setFlash(null);
              setFlash("GOOD");
              const originalProduct = expiredProducts[index];
              setFlickedStuff(t => [
                ...t,
                {
                  ...originalProduct,
                  wastedMoney: 0
                }
              ]);
            }
          }}
        />
      )}
    </>
  );
}

export default App;
