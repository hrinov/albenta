import { FC, useEffect, useState } from "react";
import Header from "./components/header";
import Plans from "./pages/Plans";
import { requestHandler } from "../../utils";
import { useDispatch } from "react-redux";
import { updateDeposits } from "../../redux/slice";
import "./index.sass";
import Deposits from "./pages/Deposits";
import WithdrawModalWindow from "./components/modal/withdraw";
import Navigation from "./components/navigation";

import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Income from "./pages/Income";

const Account: FC<AccountProps> = ({ type }) => {
  const dispatch = useDispatch();
  const [depositsLimit, setDepositsLimit] = useState<number>(5);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<{
    type: boolean;
    amount: number | null;
    depositId: number | null;
  }>({ type: false, amount: null, depositId: null });

  const handleWithdrawModal = (
    type: boolean,
    amount: number | null,
    depositId: number | null
  ) => {
    setIsWithdrawModalOpen({
      type: type,
      amount: amount || null,
      depositId: depositId || null,
    });
  };

  const getDeposits = async () => {
    let response = await requestHandler(
      `deposit?limit=${depositsLimit + 1}`,
      "GET"
    );
    if (response?.success) {
      const deposits = response.data;
      dispatch(updateDeposits(deposits));
    }
  };

  useEffect(() => {
    getDeposits();
  }, [depositsLimit]);

  return (
    <>
      <Navigation />
      <Header />
      <main className="main-page">
        <div className="container">
          {type == "plans" && <Plans />}
          {type == "deposits" && (
            <Deposits
              handleWithdrawModal={handleWithdrawModal}
              depositsLimit={depositsLimit}
              setDepositsLimit={setDepositsLimit}
            />
          )}
          {type == "activity-log" && <Activity />}
          {type == "profile" && <Profile />}
          {type == "income" && <Income />}
        </div>
        <WithdrawModalWindow
          isWithdrawModalOpen={isWithdrawModalOpen}
          handleWithdrawModal={handleWithdrawModal}
          depositsLimit={depositsLimit}
        />
      </main>
    </>
  );
};

export default Account;
