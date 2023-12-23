const url = import.meta.env.VITE_URL;
import { FC, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slice";
import { MeResponse } from "../../../types";
import { useSpring, animated } from "react-spring";
import { requestHandler } from "../../utils";

const LoginPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginUser = async () => {
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };

    const response: MeResponse = await requestHandler("login", "POST", data);

    if (response?.success) {
      const { access_token, refresh_token, id, email, name, balance } =
        response?.data;

      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("refreshToken", refresh_token);

      dispatch(
        updateUser({
          id,
          email,
          name,
          balance,
        })
      );
      setLoading(false);
      navigate("/account");
    } else {
      setLoading(false);
    }
  };

  const handleClick = () => {
    loginUser();
  };

  return (
    <section className="login-page">
      <button className={"signup-btn"} onClick={() => navigate("/signup")}>
        Sign Up
      </button>
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
  const changeColor = () => {
    const baseColor = "#db5aa1";
    const animationColor = "#0510ab";
    return useSpring({
      from: {
        color1: baseColor,
        color2: baseColor,
        color3: baseColor,
        color4: baseColor,
        color5: baseColor,
      },
      to: async (next) => {
        await next({ color1: animationColor });
        await next({ color1: baseColor });
        await next({ color2: animationColor });
        await next({ color2: baseColor });
        await next({ color3: animationColor });
        await next({ color3: baseColor });
        await next({ color4: animationColor });
        await next({ color4: baseColor });
        await next({ color5: animationColor });
        await next({ color5: baseColor });
      },
      loop: { reverse: true },
      config: { duration: 250 },
    });
  };

  return (
    <div className="title-wrapper">
      <animated.div style={loading ? { color: changeColor().color1 } : {}}>
        L
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color2 } : {}}>
        o
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color3 } : {}}>
        g
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color4 } : {}}>
        i
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color5 } : {}}>
        n
      </animated.div>
    </div>
  );
};

export default LoginPage;
