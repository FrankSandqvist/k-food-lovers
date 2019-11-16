import React, { PureComponent } from "react";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart,
  Pie, Sector 
} from 'recharts';

const products = [
  {
    id: "maito1",
    title: "Maito",
    imageURL: "https://",
    category: "dairy",
    price: 2.0
  },
  {
    id: "kaura2",
    title: "Kaura",
    imageURL: "https://",
    category: "vilja",
    price: 1.55
  },
  {
    id: "omena",
    title: "Omena",
    imageURL: "https://",
    category: "fruit",
    price: 24
  },
  {
    id: "omena2",
    title: "Omena",
    category: "fruit",
    price: 30
  }
];

function processRawData(data) {
  var chartData = {
    header: ["Product Group", "Wasted Money"],
    rows: []
  };
  for (var i = 0; i < data.length; i++) {
    const item = data[i];
    const foundRow = chartData.rows.find(row => row[0] === item.category);
    if(foundRow) {
      foundRow[1] = foundRow[1] + item.price;
    } else {
      chartData.rows.push([item.category, item.price])
    }
  }
  return chartData.rows.map(([name, price]) => ({name, price}));
};

export const Statistics = (props) => {
    var data = processRawData(props.raw_data);
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="price" fill="8884d8" />
        <Tooltip />
      </BarChart>
    );
}

export const Statistics2 = props => {
  const data = processRawData(props.raw_data);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={420}
        cy={200}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
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