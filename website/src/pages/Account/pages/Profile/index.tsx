import "./index.sass";
import { Spin } from "antd";
import eye from "../../../../icons/eye.svg";
import { FC, useEffect, useState } from "react";
import { requestHandler } from "../../../../utils";
import eye_off from "../../../../icons/eye-off.svg";
import AvatarUpload from "./components/imageLoader";
import { updateUser } from "../../../../redux/slice";
import { useDispatch, useSelector } from "react-redux";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasVisible, setIsPasVisible] = useState<boolean>(false);

  const handleUserUpdate = async () => {
    setLoading(true);
    setError("");
    if (!name && !email && !password) return;

    const response: MeResponse = await requestHandler("update-user", "PUT", {
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(password ? { password } : {}),
    });

    if (response?.success) {
      const { avatar, id, email, name, balance, access_token, refresh_token } =
        response?.data!;

      dispatch(updateUser({ id, email, name, balance, avatar }));

      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("refreshToken", refresh_token);
    } else if (response?.message) {
      setError(response?.message);
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
    <div className="profile-main-wrapper">
      <AvatarUpload />
      <form>
        name
        <input onChange={(e) => setName(e.target.value)} value={name} />
        email
        <input onChange={(e) => setEmail(e.target.value)} value={email} />
        new password
        <div className="password-holder">
          <input
            value={password || ""}
            placeholder="enter new password"
            type={isPasVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="ok-btn" onClick={handleUserUpdate}>
            SAVE
            <Spin style={{ opacity: loading ? 1 : 0 }} className="loading" />
          </div>
          <img
            src={!isPasVisible ? eye : eye_off}
            onClick={() => setIsPasVisible(!isPasVisible)}
          />
        </div>
      </form>

      <div className={`error ${error && "active"}`}>{error}</div>
    </div>
  );
};

export default Profile;
