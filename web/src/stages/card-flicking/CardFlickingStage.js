import React, { useState, useEffect } from "react";
import { Cards } from "./Cards";
import { actionFlashEmojiLookup } from "../../misc/lookup";

export const CardFlickingStage = props => {
  const { products } = props;

  const [flash, setFlash] = useState(null);
  const [flickedStuff, setFlickedStuff] = useState([]);

  useEffect(() => {
    if (flickedStuff.length === products.length) {
      props.onDone(flickedStuff);
    }
    // eslint-disable-next-line
  }, [flickedStuff.length]);

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
      <Cards
        date={Date.now()}
        itemImages={products.map(i => i.imageURL)}
        itemExpirationDates={products.map(i => i.expirationDate)}
        onFlick={(index, action) => {
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
            const originalProduct = products[index];
            setFlickedStuff(t => [
              ...t,
              {
                ...originalProduct,
                wastedMoney: originalProduct.price * wastePercentage
              }
            ]);
          }
          if (action === "EAT" || action === "KEEP") {
            const originalProduct = products[index];
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
    </>
  );
};
