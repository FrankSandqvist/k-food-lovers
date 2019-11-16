import React, { useState, useEffect, useRef } from "react";

const documentHeight = document.body.scrollHeight;

export const Slider = props => {
  const [isDragging, setIsDragging] = useState(false);
  const [barPercentage, setBarPercentage] = useState(null);

  const handleMouseMove = e => {
    e.preventDefault();
    const pos = e.touches[0].clientY;
    setBarPercentage((pos / documentHeight) * 100);
  };

  const overlayElement = useRef();

  useEffect(() => {
    const el = overlayElement.current;
    el.addEventListener("touchstart", e => {
      e.preventDefault();
      setIsDragging(true);
    });
    el.addEventListener("touchend", e => {
      setIsDragging(false);
    });
    return () => {
      el.removeEventListener("touchstart", e => {
        e.preventDefault();
        setIsDragging(true);
      });
      el.removeEventListener("touchend", e => {
        setIsDragging(false);
      });
    };
  }, []);

  useEffect(() => {
    setBarPercentage(0);
  }, [props.item.id]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("touchmove", handleMouseMove, {
        passive: false
      });
    } else if (barPercentage) {
      document.removeEventListener("touchmove", handleMouseMove);
      props.onDone(barPercentage);
    }
    // eslint-disable-next-line
  }, [isDragging]);

  return (
    <>
      <div className="TextOverlay" ref={overlayElement}>
        {Math.floor(barPercentage)} %
      </div>
      <div className="SliderContainer">
        <div style={{ height: barPercentage + "%" }}></div>
        <div
          style={{
            height: 100 - barPercentage + "%",
            backgroundImage: 'url("' + props.item.imageURL + '")',
            backgroundPositionX: "center",
            backgroundPositionY: "bottom",
            backgroundSize: "20rem",
            backgroundRepeat: "no-repeat",
            backgroundColor: "lightgray",
            backgroundBlendMode: "multiply"
          }}
        ></div>
      </div>
    </>
  );
};
