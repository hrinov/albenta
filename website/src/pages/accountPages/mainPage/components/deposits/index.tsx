import { FC } from "react";
import "./index.sass";
import { RootStateInterface, clearStates } from "../../../../../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Deposits: FC = () => {
  const dispatch = useDispatch();
  const { deposits } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
  }

  return (
    <section>
      <div className="blocks-wrapper">
        {deposits?.active &&
          deposits.active.map((deposit) => (
            <div className="block">
              <div className="data">
                <span>Amount</span>
                {deposit.amount}$
              </div>

              <div className="data">
                <span>Hours</span>
                {deposit.hours}
              </div>

              <div className="data">
                <span>Percent</span>
                {deposit.percent}%
              </div>

              <div className="data">
                <span>Open Date</span>
                {formatDate(deposit.created_at)}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Deposits;
