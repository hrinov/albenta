import "./index.sass";
import { FC } from "react";
import { Spin } from "antd";
import { Line } from "react-chartjs-2";
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
  Filler,
  Tooltip,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  RadialLinearScale
);

const Chart: FC<ChartInterface> = ({ loading, filters, monthIncome }) => {
  const createLineData = (color: string, skirtColor: string, data: any) => [
    {
      borderWidth: 4,
      pointRadius: 4,
      lineTension: 0.25,
      borderColor: color,
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      backgroundColor: color,
      pointHoverBorderWidth: 2,
      pointBorderColor: "#000",
      pointHoverBorderColor: "#000",
      pointBackgroundColor: "transparent",
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
    labels: Array.from(
      { length: (monthIncome?.daysInMonth || 0) + 1 },
      (_, i) => i
    ),
    datasets: [
      ...createLineData(
        "#e62d93",
        "rgba(230, 45, 147, 0.25)",
        Array.from(
          { length: (monthIncome?.daysInMonth || 0) + 1 },
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
        <div className={"count"} />
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
