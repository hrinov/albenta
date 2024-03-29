import { FC, useEffect, useState } from "react";
import "./index.sass";
import { useSelector } from "react-redux";
import { RootStateInterface, updateUser } from "../../../../../redux/slice";
import { requestHandler } from "../../../../utils";
import { MeResponse } from "../../../../../types";
import { useDispatch } from "react-redux";
import AvatarUpload from "./components/imageLoader";
import loadingAnimation from "../../../../icons/loading.svg";
import eye from "../../../../icons/eye.svg";
import eye_off from "../../../../icons/eye-off.svg";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const [error, setError] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasVisible, setIsPasVisible] = useState<boolean>(false);

  const handleUserUpdate = async (
    name: string | undefined,
    email: string | undefined,
    password: string | undefined
  ) => {
    setLoading(true);
    setError("");
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
            placeholder="enter new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            type={isPasVisible ? "text" : "password"}
          />
          <img
            src={!isPasVisible ? eye : eye_off}
            onClick={() => setIsPasVisible(!isPasVisible)}
          />
        </div>
      </form>
      {
        <img
          src={loadingAnimation}
          className="loading"
          style={{ opacity: loading ? 1 : 0 }}
        />
      }
      <div className={`error ${error && "active"}`}>{error}</div>
    </div>
  );
};

export default Profile;
