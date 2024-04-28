import "./index.sass";
import { Modal, Spin } from "antd";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { updateDeposits } from "../../../../../redux/slice";
import { fetchUser, requestHandler } from "../../../../../utils";

const WithdrawModalWindow: FC<ModalWindowInterface> = ({
  depositsLimit,
  isWithdrawModalOpen,
  handleWithdrawModal,
}) => {
  const dispatch: Dispatch<any> = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

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

  const handleOk = async (depositId: number) => {
    setLoading(true);
    await requestHandler("withdraw", "POST", { depositId });
    await getDeposits();
    setLoading(false);
    dispatch(fetchUser());
    handleWithdrawModal(false, null, null);
  };

  return (
    <Modal
      title="Withdraw"
      open={isWithdrawModalOpen.type}
      onOk={() => handleOk(isWithdrawModalOpen.depositId!)}
      okText="withdraw"
      onCancel={() => handleWithdrawModal(false, null, null)}
    >
      <p>
        Are you sure you want to withdraw {isWithdrawModalOpen.amount}$ to your
        account?
      </p>
      {loading && <Spin />}
    </Modal>
  );
};

export default WithdrawModalWindow;
