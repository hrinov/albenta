import "./index.sass";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { requestHandler } from "../../utils";
import { updateUser } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import { useSpring, animated, SpringValue } from "react-spring";
import loadingAnimation from "../../icons/loading.svg";

const SignupPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const registerUser = async () => {
    setError("");
    setLoading(true);
    const data = { name, email, password };

    const response: MeResponse = await requestHandler("signup", "POST", data);

    if (response?.success) {
      const { avatar, access_token, refresh_token, id, email, name, balance } =
        response.data!;

      window.localStorage.setItem("accessToken", access_token);
      window.localStorage.setItem("refreshToken", refresh_token);

      setTimeout(() => {
        dispatch(updateUser({ id, email, name, balance, avatar }));
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

  const createInput = (
    value: string,
    placeholder: string,
    onChange: (e: any) => void
  ) => <input {...{ value, placeholder, onChange }} />;

  return (
    <section className="signup-page">
      <button className={"login-btn"} onClick={() => navigate("/login")}>
        Login
      </button>
      <div className="inputs-wrapper">
        <h1>
          <AnimatedTitle loading={loading} />
        </h1>

        {createInput(name, "name", (e) => setName(e.target.value))}
        {createInput(email, "email", (e) => setEmail(e.target.value))}
        {createInput(password, "password", (e) => setPassword(e.target.value))}

        <div
          className="ok-btn"
          onClick={() => registerUser()}
          children={"NEXT"}
        />
        <img
          src={loadingAnimation}
          className="loading"
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
        "S",
        changeColor().color1,
        changeColor().transform1
      )}
      {createAnimatedElement(
        "i",
        changeColor().color2,
        changeColor().transform2
      )}
      {createAnimatedElement(
        "g",
        changeColor().color3,
        changeColor().transform3
      )}
      {createAnimatedElement(
        "n",
        changeColor().color4,
        changeColor().transform4
      )}
      <div className="space" />
      {createAnimatedElement(
        "U",
        changeColor().color5,
        changeColor().transform5
      )}
      {createAnimatedElement(
        "p",
        changeColor().color6,
        changeColor().transform6
      )}
    </div>
  );
};

export default SignupPage;
