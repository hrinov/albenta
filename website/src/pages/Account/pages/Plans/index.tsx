import "./index.sass";
import { InputNumber } from "antd";
const url = import.meta.env.VITE_SERVER_URL;
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { updateDeposits } from "../../../../redux/slice";
import { Dispatch, FC, useEffect, useState } from "react";
import { fetchUser, requestHandler } from "../../../../utils";
import loadingAnimation from "../../../../icons/deposit-loading.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Plans: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { user, deposits } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const percents = [5, 10, 15, 20, 25];
  const minHours = [1, 12, 24, 36, 48];
  const openDeposits: any = percents.map(
    (percent) =>
      deposits?.active?.find((deposit) => +deposit.percent == +percent)
  );

  const [loading, setLoading] = useState<null | number>(null);
  const [values, setValues] = useState<{ amount: number; hours: number }[]>(
    Array(5)
      .fill({})
      .map((_, i) => ({ amount: 10, hours: minHours[i] }))
  );
  const [timeToEnd, setTimeToEnd] = useState<
    {
      percent: number;
      timeToEnd: number;
    }[]
  >();

  const charts = Array(5)
    .fill({})
    .map((_, index) => ({
      labels: ["Body", "Profit"],
      datasets: [
        {
          label: " ",
          borderWidth: 1,
          borderColor: ["#000", "#000"],
          backgroundColor: ["#a6e1ff", "#a5c2ff"],
          data: [
            values[index].amount,
            (values[index].amount / 100) *
              percents[index] *
              values[index].hours,
          ],
        },
      ],
    }));

  const createBlocks = () => {
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
      dispatch(fetchUser());
      setLoading(null);
    };

    const blocks = [];
    for (let i = 0; i < 5; i++) {
      const time = timeToEnd?.find(
        (deposit) => +deposit.percent == +percents[i]
      )?.timeToEnd;

      blocks.push(
        <div
          key={i}
          className={`block ${time && "active"} ${deposits ? "" : "skeleton"}`}
        >
          Calculate profit
          <div className={`percent  ${deposits ? "" : "skeleton"}`}>
            {percents[i]}%
            <span children={"/"} />
            hour
          </div>
          <div className="configurator">
            <div className="name" children={"amount:"} />
            <InputNumber
              className={`input-${!!time ? "active" : ""} ${
                deposits ? "" : "skeleton"
              }`}
              disabled={!!time}
              min={10}
              max={user?.balance || 0}
              value={+openDeposits[i]?.amount || +values[i]?.amount}
              onChange={(value) => updateValues(+value!, i, true)}
            />
          </div>
          <div className="configurator">
            <div className="name" children={"hours:"} />
            <InputNumber
              className={`input-${!!time ? "active" : ""} ${
                deposits ? "" : "skeleton"
              }`}
              disabled={!!time}
              min={minHours[i]}
              max={100}
              value={+openDeposits[i]?.hours || +values[i]?.hours}
              onChange={(value) => updateValues(+value!, i)}
            />
          </div>
          <Doughnut
            data={charts[i]}
            className={`${deposits ? "" : "transparent"}`}
          />
          <button
            disabled={!!time || !deposits}
            onClick={() => openDeposit(values[i], +percents[i], i)}
            className={`${deposits ? "" : "skeleton"}`}
          >
            {time ? "ACTIVE" : "OPEN DEPOSIT"}
          </button>
          <img
            src={loadingAnimation}
            style={{ opacity: loading == i ? 0.8 : 0 }}
          />
          <div className={`skeleton-circle ${deposits ? "hide" : ""}`} />
          <div className={`white-circle ${deposits ? "" : "hide"}`} />
          {time && <div className="timer">{time}h</div>}
        </div>
      );
    }

    return blocks;
  };

  useEffect(() => {
    if (user?.id) {
      const ws = new WebSocket(
        url.replace("http:", "ws:") + `?userId=${user.id}`
      );
      ws.onmessage = (event) => {
        setTimeToEnd(
          JSON.parse(event.data) as {
            percent: number;
            timeToEnd: number;
          }[]
        );
      };
      return () => {
        ws.close();
      };
    }
  }, [user?.id, deposits]);

  return <section className="plans">{createBlocks()}</section>;
};

export default Plans;
