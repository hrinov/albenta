import { FC } from "react";
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
import { Line } from "react-chartjs-2";
import "./index.sass";
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

interface ChartInterface {
  loading: boolean;
}

const Chart: FC<ChartInterface> = ({
  loading,
  monthOptions,
  filters,
  currentMonth,
  currentYear,
  monthIncome,
}) => {
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
          (_, i) => monthIncome?.find((income) => income?.day == i)?.amount || 0
        )
      ),
    ],
  };

  return (
    <div>
      <div className={`line-char`}>
        <div className={"title"}>{filters.selectedMonth} income</div>
        <div className={"count"}></div>
        <div className={`chart-holder ${loading && "skeleton"}`}>
          <Line
            data={lineData}
            options={lineOptions as any}
            className={`${loading && "skeleton"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
