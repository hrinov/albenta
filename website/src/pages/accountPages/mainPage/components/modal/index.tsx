import { FC } from "react";
import { Modal } from "antd";
import { requestHandler } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { updateDeposits, updateUser } from "../../../../../../redux/slice";
import { MeResponse } from "../../../../../../types";

interface PropsInterface {
  depositsLimit: number;
  isModalOpen: {
    type: boolean;
    amount: number | null;
    depositId: number | null;
  };
  handleModal: (
    type: boolean,
    amount: number | null,
    depositId: number | null
  ) => void;
}

const ModalWindow: FC<PropsInterface> = ({
  isModalOpen,
  handleModal,
  depositsLimit,
}) => {
  const dispatch = useDispatch();

  const handleUserUpdate = async () => {
    const response: MeResponse = await requestHandler("me", "GET");
    if (response?.success) {
      const { email, name, balance } = response?.data;
      dispatch(
        updateUser({
          email: email,
          name: name,
          balance: balance,
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
    handleModal(false, null, null);
  };

  const handleCancel = () => {
    handleModal(false, null, null);
  };

  return (
    <Modal
      title="Withdrow"
      open={isModalOpen.type}
      onOk={() => handleOk(isModalOpen.depositId!)}
      okText="withdraw"
      onCancel={handleCancel}
    >
      <p>
        Are you sure you want to withdraw {isModalOpen.amount}$ to your account?
      </p>
    </Modal>
  );
};

export default ModalWindow;
