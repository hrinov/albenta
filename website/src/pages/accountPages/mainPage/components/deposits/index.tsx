import { FC } from "react";
import { RootStateInterface } from "../../../../../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InputNumber } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./index.sass";

ChartJS.register(ArcElement, Tooltip, Legend);

const Deposits: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const chartDataGenerator = (body: number, profit: number) => {
    return {
      labels: ["Body", "Profit"],
      datasets: [
        {
          label: " ",
          data: [body, profit],
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    };
  };
  const charts = [
    chartDataGenerator(10, 0.5),
    chartDataGenerator(10, 1),
    chartDataGenerator(10, 1.5),
    chartDataGenerator(10, 2),
    chartDataGenerator(10, 2.5),
  ];

  return (
    <section className="deposits">
      <div className="block">
        Calculate profit
        <div className="percent">5%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            // onChange={onChange}
          />
        </div>
        <Doughnut data={charts[0]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">10%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            // onChange={onChange}
          />
        </div>
        <Doughnut data={charts[1]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">15%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={0}
            max={100000}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            // onChange={onChange}
          />
        </div>
        <Doughnut data={charts[2]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">20%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            // onChange={onChange}
          />
        </div>
        <Doughnut data={charts[3]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">25%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            // onChange={onChange}
          />
        </div>
        <Doughnut data={charts[4]} />
        <button>OPEN DEPOSIT</button>
      </div>
    </section>
  );
};

export default Deposits;
