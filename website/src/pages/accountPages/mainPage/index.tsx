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
  const [depositsLimit, setDepositsLimit] = useState<number>(5);
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
        <Header />
        <Plans />
        <Deposits
          handleModal={handleModal}
          depositsLimit={depositsLimit}
          setDepositsLimit={setDepositsLimit}
        />
      </div>
      <ModalWindow
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        depositsLimit={depositsLimit}
      />
    </main>
  );
};

export default AccountMainPage;
