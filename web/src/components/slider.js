import React, { useState } from "react";

export const Slider = props => {
  const [state, setState] = useState({
    isDragging: false,
    dragPercentage: 0
  });

  return (
    <div
      className=""
      onClick={() => {
        props.onDone(20);
      }}
      onMouseMove={e => {
        setState(s => ({
          ...s,
          dragPercentage: e.clientY
        }));
      }}
    >
      {props.item.id} {props.item.price} €{state.dragPercentage}
    </div>
  );
};
