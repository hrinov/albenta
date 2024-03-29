import { FC, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slice";
import { MeResponse } from "../../../types";
import { useSpring, animated } from "react-spring";
import { requestHandler } from "../../utils";
import loadingAnimation from "../../icons/loading.svg";

const LoginPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginUser = async () => {
    setError("");
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };

    const response: MeResponse = await requestHandler("login", "POST", data);
    if (response?.success) {
      const { avatar, access_token, refresh_token, id, email, name, balance } =
        response?.data!;

      setTimeout(() => {
        window.localStorage.setItem("accessToken", access_token);
        window.localStorage.setItem("refreshToken", refresh_token);
        dispatch(
          updateUser({
            id,
            email,
            name,
            balance,
            avatar,
          })
        );
        setLoading(false);
        navigate("/account/deposits/plans");
      }, 3000);
    } else {
      setTimeout(() => {
        setLoading(false);
        response?.message && setError(response?.message);
      }, 3000);
    }
  };

  return (
    <>
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
          <div className="ok-btn" onClick={loginUser}>
            NEXT
          </div>
          <img
            src={loadingAnimation}
            className="loading"
            style={{ opacity: loading ? 1 : 0 }}
          />
          <div className={`error-message ${!error && "transparent"}`}>
            {error}
          </div>
        </div>
      </section>
    </>
  );
};

const AnimatedTitle: FC<{ loading: boolean }> = ({ loading }) => {
  const changeColor = () => {
    const baseColor = "#db5aa1";
    const animationColor = "#000";
    const baseTransform = "translateY(0)";
    const animatedTransform = "translateY(-4px)";

    return useSpring({
      from: {
        color1: baseColor,
        transform1: baseTransform,
        color2: baseColor,
        transform2: baseTransform,
        color3: baseColor,
        transform3: baseTransform,
        color4: baseColor,
        transform4: baseTransform,
        color5: baseColor,
        transform5: baseTransform,
      },
      to: async (next) => {
        for (let i = 1; i <= 5; i++) {
          await next({
            [`color${i}`]: animationColor,
            [`transform${i}`]: animatedTransform,
          });
          await next({
            [`color${i}`]: baseColor,
            [`transform${i}`]: baseTransform,
          });
        }
      },
      loop: { reverse: true },
      config: { duration: 300 },
    });
  };

  return (
    <div className="title-wrapper">
      <animated.div
        style={
          loading
            ? {
                color: changeColor().color1,
                transform: changeColor().transform1,
              }
            : {}
        }
      >
        L
      </animated.div>
      <animated.div
        style={
          loading
            ? {
                color: changeColor().color2,
                transform: changeColor().transform2,
              }
            : {}
        }
      >
        o
      </animated.div>
      <animated.div
        style={
          loading
            ? {
                color: changeColor().color3,
                transform: changeColor().transform3,
              }
            : {}
        }
      >
        g
      </animated.div>
      <animated.div
        style={
          loading
            ? {
                color: changeColor().color4,
                transform: changeColor().transform4,
              }
            : {}
        }
      >
        i
      </animated.div>
      <animated.div
        style={
          loading
            ? {
                color: changeColor().color5,
                transform: changeColor().transform5,
              }
            : {}
        }
      >
        n
      </animated.div>
    </div>
  );
};

export default LoginPage;
