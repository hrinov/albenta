import { FC, useState } from "react";
import { RootStateInterface } from "../../../../../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InputNumber } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./index.sass";
import { requestHandler } from "../../../../../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

const Deposits: FC = () => {
  const [loading, setLoading] = useState<null | number>(null);
  const [values, setValues] = useState<{ amount: number; hours: number }[]>(
    Array(5).fill({ amount: 10, hours: 1 })
  );
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
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

  const openDeposit = async (
    value: { amount: number; hours: number },
    percent: number
  ) => {
    setLoading(1);
    const { amount, hours } = value;
    const data = { amount, hours, percent };
    const response = await requestHandler("deposit", "POST", data);
    setLoading(null);
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
            value={values[0]?.amount}
            onChange={(value) => updateValues(value!, 0, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            value={values[0]?.hours}
            onChange={(value) => updateValues(value!, 0)}
          />
        </div>
        <Doughnut data={charts[0]} />
        <button onClick={() => openDeposit(values[0], percents[0])}>
          OPEN DEPOSIT
        </button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[1]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            value={values[1]?.amount}
            onChange={(value) => updateValues(value!, 1, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            value={values[1]?.hours}
            onChange={(value) => updateValues(value!, 1)}
          />
        </div>
        <Doughnut data={charts[1]} />
        <button onClick={() => openDeposit(values[1], percents[1])}>
          OPEN DEPOSIT
        </button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[2]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            value={values[2]?.amount}
            onChange={(value) => updateValues(value!, 2, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            value={values[2]?.hours}
            onChange={(value) => updateValues(value!, 2)}
          />
        </div>
        <Doughnut data={charts[2]} />
        <button onClick={() => openDeposit(values[2], percents[2])}>
          OPEN DEPOSIT
        </button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[3]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            value={values[3]?.amount}
            onChange={(value) => updateValues(value!, 3, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            value={values[3]?.hours}
            onChange={(value) => updateValues(value!, 3)}
          />
        </div>
        <Doughnut data={charts[3]} />
        <button onClick={() => openDeposit(values[3], percents[3])}>
          OPEN DEPOSIT
        </button>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">{percents[4]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={10}
            max={100000}
            value={values[4]?.amount}
            onChange={(value) => updateValues(value!, 4, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={1}
            max={100}
            value={values[4]?.hours}
            onChange={(value) => updateValues(value!, 4)}
          />
        </div>
        <Doughnut data={charts[4]} />
        <button onClick={() => openDeposit(values[4], percents[4])}>
          OPEN DEPOSIT
        </button>
      </div>
    </section>
  );
};

export default Deposits;
