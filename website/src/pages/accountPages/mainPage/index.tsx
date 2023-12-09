import { FC, useEffect } from "react";
import Header from "./components/header";
import Deposits from "./components/deposits";
import { requestHandler } from "../../../utils";
import { DepositInterface } from "../../../../types";
import { useDispatch } from "react-redux";
import { updateDeposits } from "../../../../redux/slice";
import "./index.sass";

const AccountMainPage: FC = () => {
  const dispatch = useDispatch();

  const getDeposits = async () => {
    let response = await requestHandler("deposit", "GET");
    if (response?.success) {
      const deposits = response.data.map((deposit: DepositInterface) => ({
        amount: +deposit.amount,
        created_at: deposit.created_at,
        hours: +deposit.hours,
        percent: +deposit.percent,
      }));
      dispatch(updateDeposits(deposits));
    }
  };

  useEffect(() => {
    getDeposits();
  }, []);

  return (
    <main className="main-page">
      <div className="container">
        <Header />
        <Deposits />
      </div>
    </main>
  );
};

export default AccountMainPage;
