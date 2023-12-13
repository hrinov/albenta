import { FC } from "react";
import { Modal } from "antd";

interface PropsInterface {
  isModalOpen: { type: boolean; amount: number | null };
  handleModal: (type: boolean, amount: number | null) => void;
}

const ModalWindow: FC<PropsInterface> = ({ isModalOpen, handleModal }) => {
  const handleOk = () => {
    handleModal(false, null);
  };

  const handleCancel = () => {
    handleModal(false, null);
  };

  return (
    <Modal
      title="Withdrow"
      open={isModalOpen.type}
      onOk={handleOk}
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
