import React, { useState, useMemo } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./Cards.css";
import { actionFlashEmojiLookup } from "../../misc/lookup";

const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

const offcenterDeadzone = 20;
const widthSection = (document.body.clientWidth - 20 * 2) / 6;
const heightSection = document.body.clientHeight / 4;

export const Cards = props => {
  const [goneX] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [goneY] = useState(() => new Set());
  const [springProps, set] = useSprings(props.itemImages.length, i => ({
    ...to(i),
    from: from(i)
  })); // Create a bunch of springs using the helpers above
  const [[action, hideAction], setAction] = useState([null, null]);

  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx, my],
      distance,
      direction,
      velocity,
      last
    }) => {
      // Direction should either point left or right
      const xDir =
        (action && action.startsWith("THROW")) || direction.xDir < 0 ? -1 : 1;

      if (down) {
        if (my < -heightSection) {
          setAction(["KEEP", false]);
        } else if (mx < -offcenterDeadzone - widthSection * 3) {
          setAction(["THROW_ALL", false]);
        } else if (mx < -offcenterDeadzone - widthSection * 2) {
          setAction(["THROW_ALMOST_ALL", false]);
        } else if (mx < -offcenterDeadzone - widthSection) {
          setAction(["THROW_ABOUT_HALF", false]);
        } else if (mx < -offcenterDeadzone) {
          setAction(["THROW_SOME_LEFT", false]);
        } else if (mx < -30 && velocity > 0.2) {
          setAction(["THROW_ALL", true]);
        } else if (mx > 100) {
          setAction(["EAT", false]);
        } else if (mx > 30 && velocity > 0.2) {
          setAction(["EAT", true]);
        } else {
          setAction([null, null]);
        }
      } else if (action) {
        if (action === "KEEP") {
          goneY.add(index);
        } else {
          goneX.add(index);
        }
        props.onFlick(index, action);
        setAction([null, null]);
      }

      set(i => {
        // We're only interested in changing spring-data for the current spring
        if (index !== i) return;
        const isGoneX = goneX.has(index);
        // When a card is gone it flys out left or right, otherwise goes back to zero
        const x = isGoneX ? (200 + window.innerWidth) * xDir : down ? mx : 0;
        const isGoneY = goneY.has(index);
        // When a card is gone it flys out left or right, otherwise goes back to zero
        const y = isGoneY ? -window.innerHeight : down ? my : 0;
        // How much the card tilts, flicking it harder makes it rotate faster
        const rot = mx / 100 + (isGoneX ? xDir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          y,
          rot,
          scale,
          delay: undefined,
          config: {
            friction: 50,
            tension: down ? 800 : isGoneX || isGoneY ? 200 : 500
          }
        };
      });
    }
  );

  const labelStyles = useMemo(() => {
    return props.itemExpirationDates.map(() => ({
      right: (0.5 + Math.random() * 2).toFixed(1) + "rem",
      bottom: (0.5 + Math.random() * 2).toFixed(1) + "rem",
      transform: "rotate(" + (2 - Math.random() * 4).toFixed(1) + "deg)"
    }));
    // eslint-disable-next-line
  }, [props.itemExpirationDates.length]);

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
          background: "rgba(0,0,0,0.7)",
          opacity: action && !hideAction ? 1 : 0,
          transition: "0.5s",
          zIndex: 1000,
          pointerEvents: "none",
          flexDirection: "column"
        }}
      >
        {action && !hideAction && (
          <>
            <div style={{ display: "flex", fontSize: "3rem" }}>
              {actionFlashEmojiLookup[action]}
            </div>
            <div style={{ display: "flex", fontSize: "1.5rem" }}>
              {
                {
                  THROW_ALL: "I threw it all!",
                  THROW_ALMOST_ALL: "I threw almost all of it",
                  THROW_ABOUT_HALF: "Roughly half left",
                  THROW_SOME_LEFT: "There was some left",
                  KEEP: "I'm keeping it",
                  EAT: "I ate it! Yum!"
                }[action]
              }
            </div>
          </>
        )}
      </div>
      {springProps.map(({ x, y, rot, scale }, i) => {
        const [day, month, year] = props.itemExpirationDates[i].split("-");
        const date = new Date(year, month - 1, day);
        console.log(+date, props.date);
        const diff = Math.round((+date - +props.date) / 1000 / 60 / 60 / 24);

        return (
          <animated.div className="card-container" key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}

            <animated.div
              className="card"
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${props.itemImages[i]})`
              }}
            >
              <div
                style={{
                  ...labelStyles[i],
                  position: "absolute",

                  backgroundColor: diff > 0 ? "black" : "crimson",
                  padding: "0.5rem",
                  borderRadius: "0.3rem",
                  color: "white",
                  fontFamily: "Impact Label, sans serif"
                }}
              >
                {diff > 0
                  ? "Expires in " + diff + " days."
                  : diff === 0
                  ? "Expires today"
                  : "Expired " + Math.abs(diff) + " days ago."}
              </div>
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
};
