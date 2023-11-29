const url = import.meta.env.VITE_URL;
import { FC, useRef, useState } from "react";
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
  const el1 = useRef<HTMLDivElement>(null);
  const el2 = useRef<HTMLDivElement>(null);
  const el3 = useRef<HTMLDivElement>(null);
  const el4 = useRef<HTMLDivElement>(null);
  const el5 = useRef<HTMLDivElement>(null);
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
      const { access_token, refresh_token, email, name, balance } =
        response?.data;
      dispatch(
        updateTokens({
          accessToken: access_token,
          refreshToken: refresh_token,
        })
      );
      dispatch(
        updateUser({
          email: email,
          name: name,
          balance: balance,
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
        <h1>
          <div className="title-wrapper">
            <div ref={el1}>L</div>
            <div ref={el2}>o</div>
            <div ref={el3}>g</div>
            <div ref={el4}>i</div>
            <div ref={el5}>n</div>
          </div>
        </h1>
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
