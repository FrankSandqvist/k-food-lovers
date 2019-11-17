import React from "react";
import { Button } from "@material-ui/core";
import "./StartStage.css";
import logo from "../../assets/logo.png";

export const StartStage = props => {
  return (
    <>
      <img
        src={logo}
        style={{
          width: "80%",
          maxWidth: "20rem"
        }}
        alt="logo"
      />
      <div className="intro-text">
        It seems like your food wasting habits are going down.
      </div>
      <Button
        onClick={() => {
          props.onDone();
        }}
        variant="contained"
        style={{
          color: "#ff6900",
          fontSize: "1.3rem",
          backgroundColor: "white"
        }}
        size="large"
      >
        Let's swipe!
      </Button>
    </>
  );
};
