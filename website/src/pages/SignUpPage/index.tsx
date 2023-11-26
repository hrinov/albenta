const url = import.meta.env.VITE_URL;
import { FC, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTokens, updateUser } from "../../../redux/slice";
import { LoginSignupResponse } from "../../../types";

const SignupPage: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const registerUser = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    let responseJSON = await fetch(`${url}/api/register`, {
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
    registerUser();
  };

  return (
    <section className="signup-page">
      <div className="inputs-wrapper">
        <h1>Sign Up</h1>
        <input
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
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

export default SignupPage;
