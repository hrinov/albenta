const url = import.meta.env.VITE_URL;
import { FC, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slice";
import { MeResponse } from "../../../types";
import { useSpring, animated } from "react-spring";

const SignupPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const registerUser = async () => {
    setLoading(true);
    const data = {
      name: name,
      email: email,
      password: password,
    };

    let responseJSON = await fetch(`${url}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = (await responseJSON.json()) as MeResponse;
    if (response?.success) {
      const { access_token, refresh_token, email, name, balance } =
        response?.data;

      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("refreshToken", refresh_token);

      dispatch(
        updateUser({
          email: email,
          name: name,
          balance: balance,
        })
      );
      setLoading(false);
      navigate("/account");
    } else {
      setLoading(false);
    }
  };

  const handleClick = () => {
    registerUser();
  };

  return (
    <section className="signup-page">
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
        color6: baseColor,
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
        await next({ color6: animationColor });
        await next({ color6: baseColor });
      },
      loop: { reverse: true },
      config: { duration: 250 },
    });
  };

  return (
    <div className="title-wrapper">
      <animated.div style={loading ? { color: changeColor().color1 } : {}}>
        S
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color2 } : {}}>
        i
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color3 } : {}}>
        g
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color4 } : {}}>
        n
      </animated.div>
      <div className="space" />
      <animated.div style={loading ? { color: changeColor().color5 } : {}}>
        U
      </animated.div>
      <animated.div style={loading ? { color: changeColor().color6 } : {}}>
        p
      </animated.div>
    </div>
  );
};

export default SignupPage;
