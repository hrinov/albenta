import { FC, useEffect, useState } from "react";
import Header from "./components/header";
import Plans from "./components/plans";
import { requestHandler } from "../../../utils";
import { useDispatch } from "react-redux";
import { updateDeposits } from "../../../../redux/slice";
import "./index.sass";
import Deposits from "./components/deposits";
import WithdrawModalWindow from "./components/modal/withdraw";
import ActivityModalWindow from "./components/modal/activity";

const AccountMainPage: FC = () => {
  const dispatch = useDispatch();
  const [depositsLimit, setDepositsLimit] = useState<number>(5);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<{
    type: boolean;
    amount: number | null;
    depositId: number | null;
  }>({ type: false, amount: null, depositId: null });

  const [isActivityModalOpen, setIsActivityModalOpen] =
    useState<boolean>(false);

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

  const handleActivityModal = (arg: boolean) => {
    setIsActivityModalOpen(arg);
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
    <main className="main-page">
      <div className="container">
        <Header handleActivityModal={handleActivityModal} />
        <Plans />
        <Deposits
          handleWithdrawModal={handleWithdrawModal}
          depositsLimit={depositsLimit}
          setDepositsLimit={setDepositsLimit}
        />
      </div>
      <WithdrawModalWindow
        isWithdrawModalOpen={isWithdrawModalOpen}
        handleWithdrawModal={handleWithdrawModal}
        depositsLimit={depositsLimit}
      />
      <ActivityModalWindow
        isActivityModalOpen={isActivityModalOpen}
        handleActivityModal={handleActivityModal}
      />
    </main>
  );
};

export default AccountMainPage;
