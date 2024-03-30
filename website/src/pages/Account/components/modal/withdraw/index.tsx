import { FC } from "react";
import { Modal } from "antd";
import { requestHandler } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { updateDeposits, updateUser } from "../../../../../../redux/slice";
import { MeResponse } from "../../../../../../types";
import "./index.sass";

interface PropsInterface {
  depositsLimit: number;
  isWithdrawModalOpen: {
    type: boolean;
    amount: number | null;
    depositId: number | null;
  };
  handleWithdrawModal: (
    type: boolean,
    amount: number | null,
    depositId: number | null
  ) => void;
}

const WithdrawModalWindow: FC<PropsInterface> = ({
  isWithdrawModalOpen,
  handleWithdrawModal,
  depositsLimit,
}) => {
  const dispatch = useDispatch();

  const handleUserUpdate = async () => {
    const response: MeResponse = await requestHandler("me", "GET");
    if (response?.success) {
      const { avatar, id, email, name, balance } = response?.data;
      dispatch(
        updateUser({
          id,
          email,
          name,
          balance,
          avatar,
        })
      );
    }
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

  const handleOk = async (depositId: number) => {
    await requestHandler("withdraw", "POST", { depositId });
    await getDeposits();
    await handleUserUpdate();
    handleWithdrawModal(false, null, null);
  };

  const handleCancel = () => {
    handleWithdrawModal(false, null, null);
  };

  return (
    <Modal
      title="Withdraw"
      open={isWithdrawModalOpen.type}
      onOk={() => handleOk(isWithdrawModalOpen.depositId!)}
      okText="withdraw"
      onCancel={handleCancel}
    >
      <p>
        Are you sure you want to withdraw {isWithdrawModalOpen.amount}$ to your
        account?
      </p>
    </Modal>
  );
};

export default WithdrawModalWindow;
