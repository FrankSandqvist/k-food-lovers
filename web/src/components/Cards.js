import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./Cards.css";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

export const Cards = props => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [springProps, set] = useSprings(props.itemImages.length, i => ({
    ...to(i),
    from: from(i)
  })); // Create a bunch of springs using the helpers above
  const [throwMode, setThrowMode] = useState(null);

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx, my],
      distance,
      direction: [xDir, yDir],
      velocity,
      last
    }) => {
      let dir = throwMode || xDir < 0 ? -1 : 1; // Direction should either point left or right

      if (down) {
        if (mx < -200) {
          setThrowMode("ALMOST_ALL");
        } else if (mx < -150) {
          setThrowMode("ABOUT_HALF");
        } else if (mx < -40) {
          setThrowMode("SOME_LEFT");
        } else {
          setThrowMode(null);
        }
      } else if (velocity > 0.2 || throwMode) {
        gone.add(index);
        props.onFlick(index, dir, throwMode);
        setThrowMode(null);
      }

      set(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === props.itemImages.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
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
          color: "white",
          background: throwMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
          transition: "0.5s",
          zIndex: 1000,
          pointerEvents: "none",
          flexDirection: "column"
        }}
      >
        <div style={{ display: "flex", fontSize: "3rem" }}>
          {
            {
              ALMOST_ALL: "🤦‍♀️",
              ABOUT_HALF: "🙎‍♀️",
              SOME_LEFT: "🤷‍♀️"
            }[throwMode]
          }
        </div>
        <div style={{ display: "flex", fontSize: "1.5rem" }}>
          {
            {
              ALMOST_ALL: "I threw almost all of it",
              ABOUT_HALF: "Roughly half left",
              SOME_LEFT: "There was some left"
            }[throwMode]
          }
        </div>
      </div>
      {springProps.map(({ x, y, rot, scale }, i) => (
        <animated.div className="card-container" key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            className="card"
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${props.itemImages[i]})`
            }}
          />
        </animated.div>
      ))}
    </>
  );
};
