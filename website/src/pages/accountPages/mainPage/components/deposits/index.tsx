import { FC, useState } from "react";
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
  const [values, setValues] = useState<{ amount: number; hours: number }[]>(
    Array(5).fill({ amount: 10, hours: 1 })
  );
  const percents = [5, 10, 15, 20, 25];
  const chartDataGenerator = (inputIndex: number) => {
    return {
      labels: ["Body", "Profit"],
      datasets: [
        {
          label: " ",
          data: [
            values[inputIndex].amount,
            (values[inputIndex].amount / 100) *
              percents[inputIndex] *
              values[inputIndex].hours,
          ],
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
  const charts = Array.from({ length: 5 }, (_, index) =>
    chartDataGenerator(index)
  );

  const updateValues = (value: number, input: number, isAmount?: boolean) => {
    const newValues = [...values];
    newValues[input] = {
      amount: isAmount ? value : newValues[input].amount,
      hours: !isAmount ? value : newValues[input].hours,
    };
    setValues(newValues);
  };

  return (
    <section className="deposits">
      <div className="block">
        Calculate profit
        <div className="percent">{percents[0]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            onChange={(value) => updateValues(value!, 0, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            onChange={(value) => updateValues(value!, 0)}
          />
        </div>
        <Doughnut data={charts[0]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[1]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            onChange={(value) => updateValues(value!, 1, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            onChange={(value) => updateValues(value!, 1)}
          />
        </div>
        <Doughnut data={charts[1]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[2]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={0}
            max={100000}
            defaultValue={0}
            onChange={(value) => updateValues(value!, 2, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            onChange={(value) => updateValues(value!, 2)}
          />
        </div>
        <Doughnut data={charts[2]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[3]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            onChange={(value) => updateValues(value!, 3, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            onChange={(value) => updateValues(value!, 3)}
          />
        </div>
        <Doughnut data={charts[3]} />
        <button>OPEN DEPOSIT</button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[40]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            defaultValue={10}
            onChange={(value) => updateValues(value!, 4, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            onChange={(value) => updateValues(value!, 4)}
          />
        </div>
        <Doughnut data={charts[4]} />
        <button>OPEN DEPOSIT</button>
      </div>
    </section>
  );
};

export default Deposits;
