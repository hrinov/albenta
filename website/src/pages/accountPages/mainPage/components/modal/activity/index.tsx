import { FC } from "react";
import { Modal } from "antd";
import "./index.sass";

interface PropsInterface {
  isActivityModalOpen: boolean;
  handleActivityModal: (arg: boolean) => void;
}

const ActivityModalWindow: FC<PropsInterface> = ({
  isActivityModalOpen,
  handleActivityModal,
}) => {
  const handleCancel = () => {
    handleActivityModal(false);
  };

  return (
    <Modal
      title="Activity Log"
      open={isActivityModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="main-wrapper">s</div>
    </Modal>
  );
};

export default ActivityModalWindow;
