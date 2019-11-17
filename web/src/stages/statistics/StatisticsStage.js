import React from "react";
import { Cell, PieChart, Pie } from "recharts";
import { Button } from "@material-ui/core";

export const StatisticsStage = props => {
  const fullPrice = props.products.reduce((acc, { price }) => acc + price, 0);
  const wastedPrice = props.wastedProducts.reduce(
    (acc, { wastedMoney }) => acc + wastedMoney,
    0
  );
  const data = [
    { name: "full", price: fullPrice - wastedPrice },
    { name: "wasted", price: wastedPrice }
  ];

  const COLORS = ["#ffffff", "#ff6900"];
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          animation: "appear 2s",
          animationFillMode: "forward",
          color: "white",
          flexDirection: "column"
        }}
      >
        {wastedPrice > 0 && (
          // eslint-disable-next-line
          <div style={{ marginBottom: "1rem", fontSize: "4rem" }}>💸</div>
        )}
        <div style={{ marginBottom: "2rem;" }}>
          {wastedPrice === 0 ? "YOU ROCK!" : "You just threw away "}
        </div>
        {wastedPrice > 0 && (
          <>
            <div style={{ fontSize: "4rem", marginBottom: "2rem" }}>
              {wastedPrice.toFixed(2) + " € "}
            </div>
            <div style={{ marginBottom: "1rem" }}>...which means you wasted:</div>
          </>
        )}
        <PieChart width={200} height={200}>
          <text x="73" y="115" fill="white">
            {Math.floor(100 * (wastedPrice / fullPrice))} %
          </text>
          <Pie
            color={COLORS}
            data={data}
            cx={100}
            cy={100}
            innerRadius={80}
            outerRadius={90}
            startAngle={180}
            endAngle={180 + 360}
            dataKey="price"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <Button
          onClick={() => {
            props.onReset();
          }}
          variant="contained"
          style={{
            color: "#ff6900",
            fontSize: "1.3rem",
            backgroundColor: "white",
            marginTop: "2rem"
          }}
          size="large"
        >
          Try again
        </Button>
      </div>
    </>
  );
};
