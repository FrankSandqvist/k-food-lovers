import React, { useState } from "react";
import "./App.css";
import { Cards } from "./components/Cards";

const expiredProducts = [
  {
    id: "maito1",
    title: "Maito",
    imageURL:
      "https://foodieimages.s3.amazonaws.com/images/entries/320x480/6415712506032_0.png",
    price: 2.0,
    category: "dairy",
    expirationDate: "20-10-2019"
  },
  {
    id: "kaura2",
    title: "Kaura",
    imageURL:
      "https://www.myllynparas.fi/sites/default/files/styles/article_image/public/thumbnails/image/Kaura-h%C3%A4rk%C3%A4papurouhe_0.jpg?itok=IEhU_dgH",
    price: 5,
    category: "grain",
    expirationDate: "20-11-2019"
  },
  {
    id: "omena",
    title: "Omena",
    imageURL:
      "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
    price: 2.0,
    category: "fruit",
    expirationDate: "18-11-2019"
  }
];

export const actionFlashEmojiLookup = {
  THROW_ALL: "😱",
  THROW_ALMOST_ALL: "🤦‍♀️",
  THROW_ABOUT_HALF: "🙎‍♀️",
  THROW_SOME_LEFT: "🤷‍♀️",
  EAT: "😋",
  KEEP: "📦"
};

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
  const wastedMoney = flickedStuff.reduce((acc, p) => {
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
          {flash}
        </div>
      )}
      {allFlicked ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            animation: "appear 2s",
            animationFillMode: "forward",
            color: "white"
          }}
        >
          {wastedMoney === 0
            ? "YOU ROCK!"
            : "💸 You just threw away " + wastedMoney.toFixed(2) + " € "}
        </div>
      ) : (
        <Cards
          date={Date.now()}
          itemImages={expiredProducts.map(i => i.imageURL)}
          itemExpirationDates={expiredProducts.map(i => i.expirationDate)}
          onFlick={(index, action) => {
            console.log(index, action);
            // throwAwayPercentage do something
            // setCurrentProduct(c => c + 1);
            setFlash(null);
            setFlash(actionFlashEmojiLookup[action]);
            if (action.startsWith("THROW")) {
              const wastePercentage =
                {
                  THROW_ALL: 1,
                  THROW_ALMOST_ALL: 0.8,
                  THROW_ABOUT_HALF: 0.5,
                  THROW_SOME_LEFT: 0.2
                }[action] || 0;
              const originalProduct = expiredProducts[index];
              setFlickedStuff(t => [
                ...t,
                {
                  ...originalProduct,
                  wastedMoney: originalProduct.price * wastePercentage
                }
              ]);
            }
            if (action === "EAT" || action === "KEEP") {
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
