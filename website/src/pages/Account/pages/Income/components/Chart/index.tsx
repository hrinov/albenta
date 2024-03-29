import { FC } from "react";
import { Line } from "react-chartjs-2";
import "./index.sass";
import { Spin } from "antd";
import { ChartInterface } from "../../../../../../../types";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

const Chart: FC<ChartInterface> = ({ loading, filters, monthIncome }) => {
  const createLineData = (color: string, skirtColor: string, data: any) => [
    {
      lineTension: 0.25,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 4,
      pointBackgroundColor: "transparent",
      pointBorderColor: "#000",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBorderColor: "#000",
      pointHoverBorderWidth: 2,
      fill: {
        target: "origin",
        above: skirtColor,
      },
      data: data,
      label: "amount in USD",
    },
  ];

  const lineOptions = {
    responsive: true,
    layout: {
      padding: 45,
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (context: any) => "day " + context[0].label + " total income",
          label: (context: any) => "$" + context.parsed.y,
        },
      },
    },
  };

  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) => i),
    datasets: [
      ...createLineData(
        "#e62d93",
        "rgba(230, 45, 147, 0.25)",
        Array.from(
          { length: 30 },
          (_, i) =>
            monthIncome?.data?.find((income: any) => income?.day == i)
              ?.amount || 0
        )
      ),
    ],
  };

  return (
    <div>
      <div className={`line-chart`}>
        <div className={"title"}>{filters.selectedMonth} income</div>
        <div className={"count"}></div>
        <div className={`chart-holder ${loading && "loading"}`}>
          {loading ? (
            <Spin />
          ) : (
            <>
              <Line data={lineData} options={lineOptions as any} />
              <div className={`total-average ${!loading && "loaded"}`}>
                <div className="total">
                  Total {filters.selectedMonth} income:
                  <span children={`$${monthIncome?.total}`} />
                </div>
                <div className="average">
                  {" "}
                  Average {filters.selectedMonth} per day income:
                  <span children={`$${monthIncome?.average}`} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
