import React, { useState } from "react";
import "./App.css";
import { Cards } from "./components/Cards";
import { Statistics } from "./func";

const expiredProducts = [
  /*{
    id: "maitorasv",
    title: "Maito",
    imageURL:
      "https://foodieimages.s3.amazonaws.com/images/entries/320x480/6415712506032_0.png",
    price: 0.59,
    category: "Dairy",
    expirationDate: "12-11-2019"
  },
  {
    id: "frooshakg750",
    title: "Mehu",
    imageURL:
      "https://www.froosh.com/globalassets/inriver/resources/akg-750ml-juice.png?width=450&height=450&mode=crop",
    price: 3.29,
    category: "Juice",
    expirationDate: "14-11-2019"
  },
  {
    id: "omena",
    title: "Omena",
    imageURL:
      "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
    price: 0.54,
    category: "Fruit",
    expirationDate: "15-11-2019"
  },
  {
    id: "jauheliha400",
    title: "Jauheliha",
    imageURL:
      "https://www.atria.fi/contentassets/e9a4aec7ef744f33b5407fa39f061b58/4117.jpg?w=555&h=555",
    price: 4.15,
    category: "Meat",
    expirationDate: "18-11-2019"
  },
  {
    id: "kanafilnat480",
    title: "Kana",
    imageURL:
      "https://www.atria.fi/contentassets/e25865dcc77a4c6b8ef86178e4f063ab/1689.jpg?w=555&h=555",
    price: 6.29,
    category: "Meat",
    expirationDate: "16-11-2019"
  },
  {
    id: "oltermanni450",
    title: "Juusto",
    imageURL:
      "https://cdn.valio.fi/mediafiles/66568094-ae1a-4de4-83d0-b5674dc5b1a4/400x400-product",
    price: 5.29,
    category: "Dairy",
    expirationDate: "17-11-2019"
  },
  {
    id: "makaronilaatikko700",
    title: "Makaronilaatikko",
    imageURL:
      "https://www.kokkikartano.fi/app/uploads/2017/05/Lihamakaronilaatikko_700g-0x500-c-default.png",
    price: 6.39,
    category: "Convenience Foods",
    expirationDate: "17-11-2019"
  },
  {
    id: "tuorepizzasaar",
    title: "Pizza",
    imageURL:
      "https://www.saarioinen.fi/globalassets/89.-kuluttajat-tuotekuvat-integraatiolla/8551.jpg?mode=crop&scale=both&anchor=middlecenter&w=600",
    price: 5.59,
    category: "Convenience Foods",
    expirationDate: "19-11-2019"
  },
  {
    id: "lohi",
    title: "Lohi",
    imageURL:
      "http://www.leroy.fi/files/cache/eaa84d029ccaecefd46e0ef8e7ab39aa_f317.jpg",
    price: 8.99,
    category: "Fish",
    expirationDate: "16-11-2019"
  },
  {
    id: "kerma",
    title: "Kerma",
    imageURL: "https://public.keskofiles.com/f/k-ruoka/product/6410405142597",
    price: 0.89,
    category: "Dairy",
    expirationDate: "12-11-2019"
  },
  {
    id: "oatlyik",
    title: "iKAFFE",
    imageURL:
      "https://www.fitnessfirst.fi/media/catalog/product/cache/1/image/x600/e3f29957c4a84f7bf5c1685080c2b7a2/o/a/oatly_ikaffe.png",
    price: 2.49,
    category: "Oat Products",
    expirationDate: "15-11-2019"
  },*/
  {
    id: "freshsalaatti",
    title: "Kreikkalainen Salaatti",
    imageURL:
      "https://hetkessa.fi/wp-content/uploads/2019/01/9153-Kreikkalainen-Salaatti.jpg",
    price: 3.99,
    category: "Convenience Foods",
    expirationDate: "17-11-2019"
  },
  {
    id: "nyhtokaura",
    title: "Nyhto Kaura",
    imageURL:
      "https://goldandgreenfoods.com/app/uploads/2019/03/GG_OB_tomaatti_uusiface7.png",
    price: 3.79,
    category: "Oat Products",
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
        <div>
          {wastedMoney === 0
            ? "YOU ROCK!"
            : "💸 You just threw away " + wastedMoney.toFixed(2) + " € "}
        </div>
         <div>
            <Statistics
             raw_data={expiredProducts}
             wasted_price={wastedMoney}
            ></Statistics>
         </div>
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
