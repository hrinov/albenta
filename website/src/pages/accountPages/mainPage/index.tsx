import { FC, useEffect } from "react";
import Header from "./components/header";
import Plans from "./components/plans";
import { requestHandler } from "../../../utils";
import { DepositInterface } from "../../../../types";
import { useDispatch } from "react-redux";
import { updateDeposits } from "../../../../redux/slice";
import "./index.sass";
import Deposits from "./components/deposits";

const AccountMainPage: FC = () => {
  const dispatch = useDispatch();

  const getDeposits = async () => {
    let response = await requestHandler("deposit", "GET");
    if (response?.success) {
      const deposits = response.data;
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
        <Plans />
        <Deposits />
      </div>
    </main>
  );
};

export default AccountMainPage;
