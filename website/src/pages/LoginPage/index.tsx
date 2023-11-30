const url = import.meta.env.VITE_URL;
import { FC, useEffect, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTokens, updateUser } from "../../../redux/slice";
import { LoginSignupResponse } from "../../../types";
import { useSpring, animated } from "react-spring";

const LoginPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
    <section className="login-page" onClick={() => setLoading(!loading)}>
      <div className="inputs-wrapper">
        <AnimatedTitle loading={loading} />
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

const AnimatedTitle: FC<{ loading: boolean }> = ({ loading }) => {
  const changeColor = (dalay: number, animationColor: string) => {
    return useSpring({
      from: { color: "#db5aa1" },
      to: async (next) => {
        await next({ color: animationColor });
        await next({ color: "#db5aa1" });
      },
      config: { duration: 300 },
      delay: dalay,
    });
  };

  const springs = loading
    ? [
        changeColor(0, "#3464eb"),
        changeColor(300, "#8d2be3"),
        changeColor(600, "#0319a3"),
        changeColor(900, "#8000ab"),
        changeColor(1200, "#290469"),
      ]
    : [];

  return (
    <div className="title-wrapper">
      <animated.div style={loading ? springs[0] : {}}>L</animated.div>
      <animated.div style={loading ? springs[1] : {}}>o</animated.div>
      <animated.div style={loading ? springs[2] : {}}>g</animated.div>
      <animated.div style={loading ? springs[3] : {}}>i</animated.div>
      <animated.div style={loading ? springs[4] : {}}>n</animated.div>
    </div>
  );
};

export default LoginPage;
