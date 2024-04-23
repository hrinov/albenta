import "./index.sass";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { requestHandler } from "../../utils";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/slice";
import loadingAnimation from "../../icons/loading.svg";
import { useSpring, animated, SpringValue } from "react-spring";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async () => {
    setError("");
    setLoading(true);
    const data = { email, password };

    const response: MeResponse = await requestHandler("login", "POST", data);
    if (response?.success) {
      const { avatar, access_token, refresh_token, id, email, name, balance } =
        response.data!;

      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("refreshToken", refresh_token);

      dispatch(updateUser({ id, email, name, balance, avatar }));
      setLoading(false);
      navigate("/account/deposits/plans");
    } else {
      setLoading(false);
      response?.message && setError(response?.message);
    }
  };

  const createInput = (
    value: string,
    placeholder: string,
    onChange: (e: any) => void
  ) => <input {...{ value, placeholder, onChange }} />;

  return (
    <section className="login-page">
      <button
        children={"Sign Up"}
        className={"signup-btn"}
        onClick={() => navigate("/signup")}
      />

      <div className="inputs-wrapper">
        <AnimatedTitle loading={loading} />

        {createInput(email, "email", (e) => setEmail(e.target.value))}
        {createInput(password, "password", (e) => setPassword(e.target.value))}

        <div className="ok-btn" onClick={loginUser} children={"NEXT"} />

        <img
          className="loading"
          src={loadingAnimation}
          style={{ opacity: loading ? 1 : 0 }}
        />
        <div
          className={`error-message ${!error && "transparent"}`}
          children={error}
        />
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

  const createAnimatedElement = (
    letter: string,
    color: SpringValue<string>,
    transform: SpringValue<string>
  ) => (
    <animated.div
      children={letter}
      style={
        loading
          ? {
              color: color,
              transform: transform,
            }
          : {}
      }
    />
  );

  return (
    <div className="title-wrapper">
      {createAnimatedElement(
        "L",
        changeColor().color1,
        changeColor().transform1
      )}
      {createAnimatedElement(
        "o",
        changeColor().color2,
        changeColor().transform2
      )}
      {createAnimatedElement(
        "g",
        changeColor().color3,
        changeColor().transform3
      )}
      {createAnimatedElement(
        "i",
        changeColor().color4,
        changeColor().transform4
      )}
      {createAnimatedElement(
        "n",
        changeColor().color5,
        changeColor().transform5
      )}
    </div>
  );
};

export default LoginPage;
