import { FC, useEffect, useState } from "react";
import Header from "./pages/header";
import Plans from "./pages/Plans";
import { requestHandler } from "../../utils";
import { useDispatch } from "react-redux";
import { updateDeposits } from "../../../redux/slice";
import "./index.sass";
import Deposits from "./pages/Deposits";
import WithdrawModalWindow from "./pages/modal/withdraw";
// import ActivityModalWindow from "./components/modal/activity";
// import ProfileModalWindow from "./components/modal/profile";
import Navigation from "./pages/navigation";
import { AccountProps } from "../../../types";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";

const Account: FC<AccountProps> = ({ type }) => {
  const dispatch = useDispatch();
  const [depositsLimit, setDepositsLimit] = useState<number>(5);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<{
    type: boolean;
    amount: number | null;
    depositId: number | null;
  }>({ type: false, amount: null, depositId: null });

  const [isActivityModalOpen, setIsActivityModalOpen] =
    useState<boolean>(false);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

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

  const handleProfileModal = (arg: boolean) => {
    setIsProfileModalOpen(arg);
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
          {/* <Deposits
            handleWithdrawModal={handleWithdrawModal}
            depositsLimit={depositsLimit}
            setDepositsLimit={setDepositsLimit}
          /> */}
        </div>
        <WithdrawModalWindow
          isWithdrawModalOpen={isWithdrawModalOpen}
          handleWithdrawModal={handleWithdrawModal}
          depositsLimit={depositsLimit}
        />
        {/* <ActivityModalWindow
          isActivityModalOpen={isActivityModalOpen}
          handleActivityModal={handleActivityModal}
        />
        <ProfileModalWindow
          isProfileModalOpen={isProfileModalOpen}
          handleProfileModal={handleProfileModal}
        /> */}
      </main>
    </>
  );
};

export default Account;
