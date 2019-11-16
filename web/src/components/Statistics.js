import React from "react";
import { BarChart, Bar, Cell, PieChart, Pie } from "recharts";

export const Statistics = props => {
  const fullPrice = props.raw_data.reduce((acc, { price }) => acc + price, 0);
  const reducedPrice = props.wasted_price;
  const data = [
    { name: "Used Products", price: fullPrice / (fullPrice + reducedPrice) },
    {
      name: "Wasted Products",
      price: reducedPrice / (fullPrice + reducedPrice)
    }
  ];
  const COLORS = ["#ffffff", "#ff6900", "#FFBB28", "#FF8042", "#ff6900"];
  return (
    <PieChart width={200} height={200}>
      <text cx="100" cy="100">Test</text>
      <Pie
        data={data}
        cx={420}
        cy={200}
        innerRadius={80}
        outerRadius={90}
        paddingAngle={5}
        dataKey="price"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
