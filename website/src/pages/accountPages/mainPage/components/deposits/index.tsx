import { FC, useState } from "react";
import { InputNumber } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./index.sass";
import { requestHandler } from "../../../../../utils";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../../../../redux/slice";
import { DepositInterface } from "../../../../../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

const Deposits: FC = () => {
  const [loading, setLoading] = useState<null | number>(null);
  const [values, setValues] = useState<{ amount: number; hours: number }[]>(
    Array(5).fill({ amount: 10, hours: 1 })
  );
  const { deposits } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const percents = [5, 10, 15, 20, 25];

  const openDeposits: (DepositInterface | undefined | boolean)[] = percents.map(
    (percent) => deposits?.find((deposit) => deposit.percent == percent)
  );
  console.log(openDeposits);
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
    percent: number,
    index: number
  ) => {
    setLoading(index);
    const { amount, hours } = value;
    const data = { amount, hours, percent };
    const response = await requestHandler("deposit", "POST", data);
    setLoading(null);
  };

  return (
    <section className="deposits">
      {deposits && (
        <>
          <div className={`block ${openDeposits[0] && "active"}`}>
            Calculate profit
            <div className="percent">{percents[0]}%/hour</div>
            <div className="configurator">
              <div className="name">amount:</div>
              <InputNumber
                disabled={!!openDeposits[0]}
                min={10}
                max={100000}
                value={
                  (typeof openDeposits[0] !== "boolean" &&
                    openDeposits[0]?.amount) ||
                  values[0]?.amount
                }
                onChange={(value) => updateValues(value!, 0, true)}
              />
            </div>
            <div className="configurator">
              <div className="name">hours:</div>
              <InputNumber
                disabled={!!openDeposits[0]}
                min={1}
                max={100}
                value={
                  (typeof openDeposits[0] !== "boolean" &&
                    openDeposits[0]?.hours) ||
                  values[0]?.hours
                }
                onChange={(value) => updateValues(value!, 0)}
              />
            </div>
            <Doughnut data={charts[0]} />
            <button
              disabled={!!openDeposits[0]}
              onClick={() => openDeposit(values[0], percents[0], 0)}
            >
              {openDeposits[0] ? "ACTIVE" : "  OPEN DEPOSIT"}
            </button>
          </div>

          <div className={`block ${openDeposits[1] && "active"}`}>
            Calculate profit
            <div className="percent">{percents[1]}%/hour</div>
            <div className="configurator">
              <div className="name">amount:</div>
              <InputNumber
                disabled={!!openDeposits[1]}
                min={10}
                max={100000}
                value={
                  (typeof openDeposits[1] !== "boolean" &&
                    openDeposits[1]?.amount) ||
                  values[1]?.amount
                }
                onChange={(value) => updateValues(value!, 1, true)}
              />
            </div>
            <div className="configurator">
              <div className="name">hours:</div>
              <InputNumber
                disabled={!!openDeposits[1]}
                min={1}
                max={100}
                value={
                  (typeof openDeposits[1] !== "boolean" &&
                    openDeposits[1]?.hours) ||
                  values[1]?.hours
                }
                onChange={(value) => updateValues(value!, 1)}
              />
            </div>
            <Doughnut data={charts[1]} />
            <button
              disabled={!!openDeposits[1]}
              onClick={() => openDeposit(values[1], percents[1], 1)}
            >
              {openDeposits[1] ? "ACTIVE" : "  OPEN DEPOSIT"}
            </button>
          </div>

          <div className={`block ${openDeposits[2] && "active"}`}>
            Calculate profit
            <div className="percent">{percents[2]}%/hour</div>
            <div className="configurator">
              <div className="name">amount:</div>
              <InputNumber
                disabled={!!openDeposits[2]}
                min={10}
                max={100000}
                value={
                  (typeof openDeposits[2] !== "boolean" &&
                    openDeposits[2]?.amount) ||
                  values[2]?.amount
                }
                onChange={(value) => updateValues(value!, 2, true)}
              />
            </div>
            <div className="configurator">
              <div className="name">hours:</div>
              <InputNumber
                disabled={!!openDeposits[2]}
                min={1}
                max={100}
                value={
                  (typeof openDeposits[2] !== "boolean" &&
                    openDeposits[2]?.hours) ||
                  values[2]?.hours
                }
                onChange={(value) => updateValues(value!, 2)}
              />
            </div>
            <Doughnut data={charts[2]} />
            <button
              disabled={!!openDeposits[2]}
              onClick={() => openDeposit(values[2], percents[2], 2)}
            >
              {openDeposits[2] ? "ACTIVE" : "  OPEN DEPOSIT"}
            </button>
          </div>

          <div className={`block ${openDeposits[3] && "active"}`}>
            Calculate profit
            <div className="percent">{percents[3]}%/hour</div>
            <div className="configurator">
              <div className="name">amount:</div>
              <InputNumber
                disabled={!!openDeposits[3]}
                min={10}
                max={100000}
                value={
                  (typeof openDeposits[3] !== "boolean" &&
                    openDeposits[3]?.amount) ||
                  values[3]?.amount
                }
                onChange={(value) => updateValues(value!, 3, true)}
              />
            </div>
            <div className="configurator">
              <div className="name">hours:</div>
              <InputNumber
                disabled={!!openDeposits[3]}
                min={1}
                max={100}
                value={
                  (typeof openDeposits[3] !== "boolean" &&
                    openDeposits[3]?.hours) ||
                  values[3]?.hours
                }
                onChange={(value) => updateValues(value!, 3)}
              />
            </div>
            <Doughnut data={charts[3]} />
            <button
              disabled={!!openDeposits[3]}
              onClick={() => openDeposit(values[3], percents[3], 3)}
            >
              {openDeposits[3] ? "ACTIVE" : "  OPEN DEPOSIT"}
            </button>
          </div>

          <div className={`block ${openDeposits[4] && "active"}`}>
            Calculate profit
            <div className="percent">{percents[4]}%/hour</div>
            <div className="configurator">
              <div className="name">amount:</div>
              <InputNumber
                disabled={!!openDeposits[4]}
                min={10}
                max={100000}
                value={
                  (typeof openDeposits[4] !== "boolean" &&
                    openDeposits[4]?.amount) ||
                  values[4]?.amount
                }
                onChange={(value) => updateValues(value!, 4, true)}
              />
            </div>
            <div className="configurator">
              <div className="name">hours:</div>
              <InputNumber
                disabled={!!openDeposits[4]}
                min={1}
                max={100}
                value={
                  (typeof openDeposits[4] !== "boolean" &&
                    openDeposits[4]?.hours) ||
                  values[4]?.hours
                }
                onChange={(value) => updateValues(value!, 4)}
              />
            </div>
            <Doughnut data={charts[4]} />
            <button
              disabled={!!openDeposits[4]}
              onClick={() => openDeposit(values[4], percents[4], 4)}
            >
              {openDeposits[4] ? "ACTIVE" : "  OPEN DEPOSIT"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Deposits;
