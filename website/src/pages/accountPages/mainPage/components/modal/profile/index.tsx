import { FC } from "react";
import { Modal, Button } from "antd";
import profileDefaultImg from "../../../../../../images/profile.png";
import "./index.sass";

interface PropsInterface {
  isProfileModalOpen: boolean;
  handleProfileModal: (arg: boolean) => void;
}

const ProfileModalWindow: FC<PropsInterface> = ({
  isProfileModalOpen,
  handleProfileModal,
}) => {
  const handleCancel = () => {
    handleProfileModal(false);
  };

  return (
    <Modal
      title="Profile"
      open={isProfileModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => console.log("submit")}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="main-wrapper">
        <img className="avatar" src={profileDefaultImg} />
        <form>
          name
          <input />
          email
          <input />
          password
          <input />
        </form>
      </div>
    </Modal>
  );
};

export default ProfileModalWindow;
