import React from "react";
import { Cell, PieChart, Pie } from "recharts";

export const StatisticsStage = props => {
  const fullPrice = props.products.reduce((acc, { price }) => acc + price, 0);
  const wastedPrice = props.wastedProducts.reduce(
    (acc, { price }) => acc + price,
    0
  );
  const data = [
    { name: "full", price: fullPrice / (fullPrice + wastedPrice) },
    { name: "wasted", price: wastedPrice / (fullPrice + wastedPrice) }
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
        <div>
          {wastedPrice === 0
            ? "YOU ROCK!"
            : "💸 You just threw away " + wastedPrice.toFixed(2) + " € "}
        </div>
        <PieChart width={200} height={200}>
          <text x="73" y="115" fill="white">
            {Math.floor(100 * (fullPrice / (fullPrice + wastedPrice)))} %
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
      </div>
    </>
  );
};
