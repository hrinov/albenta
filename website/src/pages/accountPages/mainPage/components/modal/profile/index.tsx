import { FC, useState } from "react";
import { Modal, Button } from "antd";
import profileDefaultImg from "../../../../../../images/profile.png";
import "./index.sass";
import { useSelector } from "react-redux";
import {
  RootStateInterface,
  updateUser,
} from "../../../../../../../redux/slice";
import { requestHandler } from "../../../../../../utils";
import { MeResponse } from "../../../../../../../types";
import { useDispatch } from "react-redux";

interface PropsInterface {
  isProfileModalOpen: boolean;
  handleProfileModal: (arg: boolean) => void;
}

const ProfileModalWindow: FC<PropsInterface> = ({
  isProfileModalOpen,
  handleProfileModal,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>();

  const handleCancel = () => {
    handleProfileModal(false);
  };

  const handleUserUpdate = async (
    name: string | undefined,
    email: string | undefined,
    password: string | undefined
  ) => {
    console.log(name, email, password);
    if (!name && !email && !password) {
      return;
    }
    const response: MeResponse = await requestHandler("update-user", "PUT", {
      ...(name ? { name: name } : {}),
      ...(email ? { email: email } : {}),
      ...(password ? { password: password } : {}),
    });
    if (response?.success) {
      const { id, email, name, balance } = response?.data;
      dispatch(
        updateUser({
          id: id,
          email: email,
          name: name,
          balance: balance,
        })
      );
    }
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
          onClick={() => handleUserUpdate(name, email, password)}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="profile-main-wrapper">
        <img className="avatar" src={profileDefaultImg} />
        <form>
          name
          <input onChange={(e) => setName(e.target.value)} value={name} />
          email
          <input onChange={(e) => setEmail(e.target.value)} value={email} />
          new password
          <input
            placeholder="enter new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            type="password"
          />
        </form>
      </div>
    </Modal>
  );
};

export default ProfileModalWindow;
