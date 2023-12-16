import { FC } from "react";
import "./index.sass";
import { RootStateInterface } from "../../../../../../redux/slice";
import { useSelector } from "react-redux";
import { DepositInterface } from "../../../../../../types";

interface PropsInterface {
  handleModal: (
    type: boolean,
    amount: number | null,
    depositId: number
  ) => void;
}

const Deposits: FC<PropsInterface> = ({ handleModal }) => {
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

  const createDepositData = (deposit: DepositInterface) => (
    <>
      <div className="data">
        <span>Amount</span>
        {deposit.amount}$
      </div>

      <div className="data">
        <span>Profit</span>
        {deposit.profit}$
      </div>

      <div className="data">
        <span>Total Sum</span>
        {deposit.total_sum}$
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

      <div className="data">
        <span>End Date</span>
        {formatDate(deposit.end_date)}
      </div>
    </>
  );

  return (
    <section>
      <div className="blocks-wrapper">
        {deposits?.active &&
          deposits.active.map((deposit, i) => (
            <div className="block active" key={deposit.created_at + "-" + i}>
              {createDepositData(deposit)}
              <div className="data">
                <span>DEPOSIT STATUS</span>
                <div className="status">ACTIVE</div>
              </div>
            </div>
          ))}

        {deposits?.ready &&
          deposits.ready.map((deposit, i) => (
            <div className="block ready" key={deposit.created_at + "-" + i}>
              {createDepositData(deposit)}
              <div className="data">
                <span>DEPOSIT STATUS</span>
                <button
                  onClick={() =>
                    handleModal(true, deposit.total_sum, deposit.id)
                  }
                >
                  WITHDRAW NOW
                </button>
              </div>
            </div>
          ))}

        {deposits?.closed &&
          deposits.closed.map((deposit, i) => (
            <div className="block closed" key={deposit.created_at + "-" + i}>
              {createDepositData(deposit)}
              <div className="data">
                <span>DEPOSIT STATUS</span>
                CLOSED
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Deposits;
