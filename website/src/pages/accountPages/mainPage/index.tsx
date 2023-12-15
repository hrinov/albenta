import { FC, useEffect, useState } from "react";
import Header from "./components/header";
import Plans from "./components/plans";
import { requestHandler } from "../../../utils";
import { useDispatch } from "react-redux";
import { updateDeposits } from "../../../../redux/slice";
import "./index.sass";
import Deposits from "./components/deposits";
import ModalWindow from "./components/modal";

const AccountMainPage: FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<{
    type: boolean;
    amount: number | null;
    depositId: number | null;
  }>({ type: false, amount: null, depositId: null });

  const handleModal = (
    type: boolean,
    amount: number | null,
    depositId: number | null
  ) => {
    setIsModalOpen({
      type: type,
      amount: amount || null,
      depositId: depositId || null,
    });
  };

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
        <Deposits handleModal={handleModal} />
      </div>
      <ModalWindow isModalOpen={isModalOpen} handleModal={handleModal} />
    </main>
  );
};

export default AccountMainPage;
