import { FC, useState } from "react";
import { InputNumber } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./index.sass";
import { requestHandler } from "../../../../../utils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateDeposits } from "../../../../../../redux/slice";
import { RootStateInterface } from "../../../../../../redux/slice";
import loadingAnimation from "../../../../../icons/deposit-loading.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const Plans: FC = () => {
  const [loading, setLoading] = useState<null | number>(null);
  const [values, setValues] = useState<{ amount: number; hours: number }[]>(
    Array(5).fill({ amount: 10, hours: 1 })
  );
  const dispatch = useDispatch();
  let { deposits } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const percents = [5, 10, 15, 20, 25];
  const openDeposits: any = percents.map(
    (percent) =>
      deposits?.active?.find((deposit) => +deposit.percent == +percent)
  );

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

  const getDeposits = async () => {
    let response = await requestHandler("deposit", "GET");
    if (response?.success) {
      const deposits = response.data;
      dispatch(updateDeposits(deposits));
    }
  };

  const openDeposit = async (
    value: { amount: number; hours: number },
    percent: number,
    index: number
  ) => {
    setLoading(index);
    const { amount, hours } = value;
    const data = { amount, hours, percent };
    await requestHandler("deposit", "POST", data);
    await getDeposits();
    setLoading(null);
  };

  const blocks = [];
  for (let i = 0; i < 5; i++) {
    blocks.push(
      <div
        key={i}
        className={`block ${openDeposits[i] && "active"} ${
          deposits ? "skeleton" : "skeleton"
        }`}
      >
        Calculate profit
        <div className="percent">{percents[i]}%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            className={`input-${!!openDeposits[i] ? "active" : ""} ${
              deposits ? "hide" : "hide"
            }`}
            disabled={!!openDeposits[i]}
            min={10}
            max={100000}
            value={+openDeposits[i]?.amount || +values[i]?.amount}
            onChange={(value) => updateValues(+value!, i, true)}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            className={`input-${!!openDeposits[i] ? "active" : ""} ${
              deposits ? "hide" : "hide"
            }`}
            disabled={!!openDeposits[i]}
            min={1}
            max={100}
            value={+openDeposits[i]?.hours || +values[i]?.hours}
            onChange={(value) => updateValues(+value!, i)}
          />
        </div>
        <Doughnut
          data={charts[i]}
          className={`${deposits ? "skeleton" : "skeleton"}`}
        />
        <button
          disabled={!!openDeposits[i]}
          onClick={() => openDeposit(values[i], +percents[i], i)}
          className={`${deposits ? "hide" : "hide"}`}
        >
          {openDeposits[i] ? "ACTIVE" : "OPEN DEPOSIT"}
        </button>
        <img
          src={loadingAnimation}
          style={{ opacity: loading == i ? 0.8 : 0 }}
        />
        <div className={`white-circle ${deposits ? "hide" : "hide"}`} />
      </div>
    );
  }
  return <section className="deposits">{blocks}</section>;
};

export default Plans;
