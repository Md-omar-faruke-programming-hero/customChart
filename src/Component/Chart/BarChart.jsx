// BarChart.js
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import moment from "moment";
Chart.register(...registerables);

const energyData = [
  { time: "1", price: 0.11 },
  { time: "2", price: 0.1 },
  { time: "3", price: 0.13 },
  { time: "4", price: 0.09 },
  { time: "5", price: 0.15 },
  { time: "6", price: 0.18 },
  { time: "7", price: 0.2 },
  { time: "8", price: 0.22 },
  { time: "9", price: 0.16 },
  { time: "10", price: 0.14 },
  { time: "11", price: 0.13 },
  { time: "12", price: 0.12 },
  { time: "13", price: 0.17 },
  { time: "14", price: 0.19 },
  { time: "15", price: 0.21 },
  { time: "16", price: 0.23 },
  { time: "17", price: 0.25 },
  { time: "18", price: 0.27 },
  { time: "19", price: 0.3 },
  { time: "20", price: 0.28 },
  { time: "21", price: 0.26 },
  { time: "22", price: 0.24 },
  { time: "23", price: 0.22 },
  { time: "24", price: 0.2 },
];

const BarChart = () => {
  const [hoveredData, setHoveredData] = useState(null);

  // Extract hours and prices from energyData
  const hours = energyData.map((point) => `${point.time}`);
  const prices = energyData.map((point) => point.price * 100); // Convert to cents

  const data = {
    labels: hours,
    datasets: [
      {
        data: prices,
        label: 'Cents',
        backgroundColor: (context) => {
          const value = context.raw;
          return value <= 15 ? "green" : value <= 29 ? "black" : "orange";
        },

        barThickness: 10, // Set fixed bar width
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        }, // Apply border radius to top corners
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false, // Hide the legend
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    onHover: (event, chartElement) => {
      if (chartElement.length) {
        const index = chartElement[0].index;
        setHoveredData(prices[index]);
      } else {
        setHoveredData(null);
      }
    },
    scales: {
      x: {
        title: {
          display: true,
        },
        ticks: {
          autoSkip: true, // Show all labels
        },
        grid: {
            display: false, // Keep grid lines
          },
      },
      y: {
        title: {
          display: true,
        },
        grid: {
          display: true, // Keep grid lines
        },
        border: {
          display: false, // Hide y-axis line
        },
        ticks: {
          border: false, // Hide tick marks
          callback: (value) => `€${(value / 100).toFixed(2)}`, // Format as currency
        },
        suggestedMin: 0,
        suggestedMax: 45,
      },
    },
  };

  return (
    <div className=" p-[70px] bg-yellow-50 rounded-[30px] w-[1300px] shadow-lg h-[1050px] mt-[200px] mx-auto">
        <p className="text-black text-[32px] font-bold mb-[50px]">All-in Stroomprijzen {moment().format('D MMMM YYYY')}</p>
      <div style={{ width: "1200px", height: "933px" }}>
        <Bar data={data} options={options} />
        <div
          className="rounded-[10px] px-[50px] py-[20px] h-auto"
          style={{
            marginTop: "20px",

            backgroundColor: hoveredData
              ? hoveredData <= 15
                ? "green"
                : hoveredData <= 29
                ? "black"
                : "orange"
              : "transparent",
            color: hoveredData ? "white" : "black",
          }}
        >
          <div>
            {hoveredData !== null ? <p className="text-[40px] font-bold">{hoveredData.toFixed()}ct<span className="text-[16px]">/kwt</span></p> : "Hover over a bar to see details"}
          </div>
          <p className="text-white text-[20px]">Stroomprijs 17:00 - 17:59 uur</p>
        </div>

        <div className="mt-[40px] flex">
            <div className="flex items-center mr-[10px]">
                <div className="w-[20px] h-[8px] bg-[green] rounded-[20px] mr-[10px]"></div>
                <span>Slimme uren</span>
            </div>
            <div className="flex items-center mr-[10px]">
                <div className="w-[20px] h-[8px] bg-[black] rounded-[20px] mr-[10px]"></div>
                <span>Normale uren</span>
            </div>
            <div className="flex items-center mr-[10px]">
                <div className="w-[20px] h-[8px] bg-[orange] rounded-[20px] mr-[10px]"></div>
                <span>Piekuren</span>
            </div>
           
        </div>
      </div>
    </div>
  );
};

export default BarChart;
