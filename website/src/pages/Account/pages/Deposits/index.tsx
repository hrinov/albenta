import { Empty } from "antd";
import "./index.sass";
import { FC } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../../../utils";

const Deposits: FC<DepositsInterface> = ({
  handleWithdrawModal,
  depositsLimit,
  setDepositsLimit,
}) => {
  const { deposits } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const closedDeposits = deposits?.closed.length || 0;
  const activeDeposits = deposits?.active.length || 0;
  const readyDeposits = deposits?.ready.length || 0;
  const totalDeposits = closedDeposits + activeDeposits + readyDeposits;

  const createDepositBlock = (
    index: number,
    type: string,
    deposit: DepositInterface
  ) => {
    const createData = (
      name: string,
      value: string | number,
      symbol: string
    ) => (
      <div className="data">
        <span children={name} />
        {value}
        {symbol}
      </div>
    );

    return (
      <div className={`block ${type}`} key={type + "-" + index}>
        {createData("Amount", deposit.amount, "$")}
        {createData("Profit", deposit.profit, "$")}
        {createData("Total Sum", deposit.total_sum, "$")}
        {createData("Hours", deposit.hours, "")}
        {createData("Percent", deposit.percent, "%")}
        {createData("Open Date", formatDate(deposit.created_at), "")}
        {createData("End Date", formatDate(deposit.end_date), "")}
        <div className="data">
          {type !== "ready" ? (
            <>
              <span>DEPOSIT STATUS</span>
              <div className="status" children={type.toUpperCase()} />
            </>
          ) : (
            <button
              onClick={() =>
                handleWithdrawModal(true, deposit.total_sum, deposit.id)
              }
            >
              WITHDRAW NOW
            </button>
          )}
        </div>
      </div>
    );
  };

  const noDeposits =
    deposits?.active?.length == 0 &&
    deposits?.ready?.length == 0 &&
    deposits?.closed?.length == 0;

  return (
    <section className="deposits">
      <div className="blocks-wrapper">
        {!deposits &&
          [0, 1, 2].map((_, i) => (
            <div className="block skeleton" key={"deposit-skeleton-" + i} />
          ))}

        {noDeposits && <Empty />}

        {deposits?.active &&
          deposits.active.map(
            (deposit, i) =>
              i < depositsLimit && createDepositBlock(i, "active", deposit)
          )}

        {deposits?.ready &&
          deposits.ready.map(
            (deposit, i) =>
              i < depositsLimit - activeDeposits &&
              createDepositBlock(i, "ready", deposit)
          )}

        {deposits?.closed &&
          deposits.closed.map(
            (deposit, i) =>
              i < depositsLimit - (activeDeposits + readyDeposits) &&
              createDepositBlock(i, "closed", deposit)
          )}
      </div>

      {totalDeposits > 0 && totalDeposits >= depositsLimit && (
        <div
          className="show-more"
          onClick={() => setDepositsLimit(depositsLimit + 5)}
          children={"SHOW MORE"}
        />
      )}
    </section>
  );
};

export default Deposits;
