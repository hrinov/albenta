import "./index.sass";
import Plans from "./pages/Plans";
import Income from "./pages/Income";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import Deposits from "./pages/Deposits";
import Header from "./components/header";
import { useDispatch } from "react-redux";
import { getDeposits } from "../../utils";
import { Dispatch } from "@reduxjs/toolkit";
import { FC, useEffect, useState } from "react";
import Navigation from "./components/navigation";
import WithdrawModalWindow from "./components/modal/withdraw";

const Account: FC<AccountProps> = ({ type }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const [depositsLimit, setDepositsLimit] = useState<number>(5);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState<ModalWindowOptionsInterface>({
      type: false,
      amount: null,
      depositId: null,
    });

  const handleWithdrawModal = (
    type: ModalWindowOptionsInterface["type"],
    amount: ModalWindowOptionsInterface["amount"],
    depositId: ModalWindowOptionsInterface["depositId"]
  ) => {
    setIsWithdrawModalOpen({
      type,
      amount: amount || null,
      depositId: depositId || null,
    });
  };

  useEffect(() => {
    dispatch(getDeposits(depositsLimit));
  }, [depositsLimit]);

  let content;
  switch (type) {
    case "plans":
      content = <Plans />;
      break;
    case "deposits":
      content = (
        <Deposits
          {...{ depositsLimit, setDepositsLimit, handleWithdrawModal }}
        />
      );
      break;
    case "activity-log":
      content = <Activity />;
      break;
    case "profile":
      content = <Profile />;
      break;
    case "income":
      content = <Income />;
  }

  return (
    <>
      <Navigation />
      <Header />
      <main className="main-page">
        <div className="container" children={content} />
        <WithdrawModalWindow
          {...{ depositsLimit, isWithdrawModalOpen, handleWithdrawModal }}
        />
      </main>
    </>
  );
};

export default Account;
