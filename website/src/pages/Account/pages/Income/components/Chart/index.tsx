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
  //   const lineFetchedData = Array.from(
  //     { length: currentYear == +filters.selectedYear ? currentMonth : 12 },
  //     (_, i) =>
  //       (monthIncome?.[
  //         monthOptions[i].label.toLowerCase()
  //       ]?.haircare ?? 0
  //   );

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
          label: (context: any) => context.parsed.y,
        },
      },
    },
  };

  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) => i),
    datasets: [
      ...createLineData(
        "#C8E6F7",
        "rgba(200, 230, 247, 0.3)",
        Array.from(
          { length: 30 },
          (_, i) => monthIncome?.find((income) => income?.day == i)?.amount || 0
        )
      ),
    ],
  };

  return (
    <div>
      <div className={`line-chart ${loading && "skeleton"}`}>
        <div className={"title"}>
          <div children={"HAIRCARE"} />
          <div children={"COLOR.ME & GLOSS"} />
        </div>
        <div className={"count"}>
          {/* <div children={formatAmount(totalHaircare)} />
          <div children={formatAmount(totalColor)} /> */}
        </div>
        <div className={"chart-holder"}>
          <Line data={lineData} options={lineOptions as any} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
