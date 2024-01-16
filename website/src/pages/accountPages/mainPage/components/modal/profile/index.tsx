import { FC, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import "./index.sass";
import { useSelector } from "react-redux";
import {
  RootStateInterface,
  updateUser,
} from "../../../../../../../redux/slice";
import { requestHandler } from "../../../../../../utils";
import { MeResponse } from "../../../../../../../types";
import { useDispatch } from "react-redux";
import AvatarUpload from "./components/imageLoader";
import loadingAnimation from "../../../../../../icons/loading.svg";
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
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    handleProfileModal(false);
  };

  const handleUserUpdate = async (
    name: string | undefined,
    email: string | undefined,
    password: string | undefined
  ) => {
    setLoading(true);
    if (!name && !email && !password) {
      return;
    }
    const response: MeResponse = await requestHandler("update-user", "PUT", {
      ...(name ? { name: name } : {}),
      ...(email ? { email: email } : {}),
      ...(password ? { password: password } : {}),
    });
    if (response?.success) {
      const { avatar, id, email, name, balance, access_token, refresh_token } =
        response?.data!;
      dispatch(
        updateUser({
          id,
          email,
          name,
          balance,
          avatar,
        })
      );
      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("refreshToken", refresh_token);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

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
          Save
        </Button>,
      ]}
    >
      <div className="profile-main-wrapper">
        <AvatarUpload />
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
        {
          <img
            src={loadingAnimation}
            className="loading"
            style={{ opacity: loading ? 1 : 0 }}
          />
        }
      </div>
    </Modal>
  );
};

export default ProfileModalWindow;
