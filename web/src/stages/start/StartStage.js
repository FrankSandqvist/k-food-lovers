import React from "react";
import { Button } from "@material-ui/core";
import "./StartStage.css";

export const StartStage = props => {
  return (
    <>
      <div className="intro-text">
        It looks like you're wasting a lot of food, foo
      </div>
      <Button
        onClick={() => {
          props.onDone();
        }}
      >
        Start
      </Button>
    </>
  );
};
