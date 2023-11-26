const url = import.meta.env.VITE_URL;
import { FC, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTokens, updateUser } from "../../../redux/slice";
import { LoginSignupResponse } from "../../../types";

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const data = {
      email: email,
      password: password,
    };

    let responseJSON = await fetch(`${url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = (await responseJSON.json()) as LoginSignupResponse;

    if (response?.success) {
      dispatch(
        updateTokens({
          accessToken: response?.data?.access_token,
          refreshToken: response?.data?.refresh_token,
        })
      );
      dispatch(
        updateUser({
          email: response?.data?.email,
          name: response?.data?.name,
        })
      );
      navigate("/account");
    }
  };

  const handleClick = () => {
    loginUser();
  };

  return (
    <section className="login-page">
      <div className="inputs-wrapper">
        <h1>Login</h1>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="ok-btn" onClick={handleClick}>
          NEXT
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
