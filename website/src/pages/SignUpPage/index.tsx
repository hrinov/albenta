import { FC, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slice";
import { MeResponse } from "../../../types";
import { useSpring, animated } from "react-spring";
import { requestHandler } from "../../utils";
import loadingAnimation from "../../icons/loading.svg";

const SignupPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const registerUser = async () => {
    setError("");
    setLoading(true);
    const data = {
      name: name,
      email: email,
      password: password,
    };

    const response: MeResponse = await requestHandler("signup", "POST", data);

    if (response?.success) {
      const { avatar, access_token, refresh_token, id, email, name, balance } =
        response?.data!;

      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("refreshToken", refresh_token);

      setTimeout(() => {
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
      }, 3500);
    } else {
      setTimeout(() => {
        setLoading(false);
        response?.message && setError(response?.message);
      }, 3500);
    }
  };

  const handleClick = () => {
    registerUser();
  };

  return (
    <section className="signup-page">
      <button className={"login-btn"} onClick={() => navigate("/login")}>
        Login
      </button>
      <div className="inputs-wrapper">
        <h1>
          <AnimatedTitle loading={loading} />
        </h1>
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
        color6: baseColor,
        transform6: baseTransform,
      },
      to: async (next) => {
        for (let i = 1; i <= 6; i++) {
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
        S
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
        i
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
        n
      </animated.div>
      <div className="space" />
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
        U
      </animated.div>
      <animated.div
        style={
          loading
            ? {
                color: changeColor().color6,
                transform: changeColor().transform6,
              }
            : {}
        }
      >
        p
      </animated.div>
    </div>
  );
};

export default SignupPage;
