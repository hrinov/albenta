import React, { FC, SetStateAction } from "react";
import "./index.sass";
import { useSelector } from "react-redux";

interface PropsInterface {
  handleWithdrawModal: (
    type: boolean,
    amount: number | null,
    depositId: number
  ) => void;
  depositsLimit: number;
  setDepositsLimit: React.Dispatch<SetStateAction<number>>;
}

const Deposits: FC<PropsInterface> = ({
  handleWithdrawModal,
  depositsLimit,
  setDepositsLimit,
}) => {
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

  const showMoreItems = () => {
    setDepositsLimit(depositsLimit + 5);
  };

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

  const totalDeposits = deposits
    ? deposits.active.length + deposits.closed.length + deposits.ready.length
    : 0;
  const activeDeposits = deposits?.active.length || 0;
  const readyDeposits = deposits?.ready.length || 0;

  return (
    <section className="deposits">
      <div className="blocks-wrapper">
        {!deposits &&
          [0, 1, 2].map((item, i) => (
            <div className="block skeleton" key={"deposit-skeleton-" + i} />
          ))}

        {deposits?.active &&
          deposits.active.map(
            (deposit, i) =>
              i < depositsLimit && (
                <div
                  className="block active"
                  key={deposit.created_at + "-" + i}
                >
                  {createDepositData(deposit)}
                  <div className="data">
                    <span>DEPOSIT STATUS</span>
                    <div className="status">ACTIVE</div>
                  </div>
                </div>
              )
          )}

        {deposits?.ready &&
          deposits.ready.map(
            (deposit, i) =>
              i < depositsLimit - activeDeposits && (
                <div className="block ready" key={deposit.created_at + "-" + i}>
                  {createDepositData(deposit)}
                  <div className="data">
                    <button
                      onClick={() =>
                        handleWithdrawModal(true, deposit.total_sum, deposit.id)
                      }
                    >
                      WITHDRAW NOW
                    </button>
                  </div>
                </div>
              )
          )}

        {deposits?.closed &&
          deposits.closed.map(
            (deposit, i) =>
              i < depositsLimit - (activeDeposits + readyDeposits) && (
                <div
                  className="block closed"
                  key={deposit.created_at + "-" + i}
                >
                  {createDepositData(deposit)}
                  <div className="data">
                    <span>DEPOSIT STATUS</span>
                    CLOSED
                  </div>
                </div>
              )
          )}
      </div>
      {totalDeposits > 0 && totalDeposits >= depositsLimit && (
        <div className="show-more" onClick={showMoreItems}>
          SHOW MORE
        </div>
      )}
    </section>
  );
};

export default Deposits;
