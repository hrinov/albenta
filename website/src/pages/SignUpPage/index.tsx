import "./index.sass";
import { Spin } from "antd";
import eye from "../../icons/eye.svg";
import { useDispatch } from "react-redux";
import { useSpring, a } from "react-spring";
import styles from "./animation.module.sass";
import { requestHandler } from "../../utils";
import eye_off from "../../icons/eye-off.svg";
import { updateUser } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";

const SignupPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasVisible, setIsPasVisible] = useState<boolean>(false);

  const registerUser = async () => {
    setError("");
    setLoading(true);
    const data = { name, email, password };

    const response: MeResponse = await requestHandler("signup", "POST", data);

    setTimeout(() => {
      if (response?.success) {
        const {
          avatar,
          access_token,
          refresh_token,
          id,
          email,
          name,
          balance,
        } = response.data!;

        window.localStorage.setItem("accessToken", access_token);
        window.localStorage.setItem("refreshToken", refresh_token);

        dispatch(updateUser({ id, email, name, balance, avatar }));
        setLoading(false);
        navigate("/account/deposits/plans");
      } else {
        setLoading(false);
        response?.message && setError(response?.message);
      }
    }, 1000);
  };

  const createInput = (
    value: string,
    placeholder: string,
    onChange: (e: any) => void
  ) => (
    <>
      <input
        {...{ value, placeholder, onChange }}
        type={isPasVisible || placeholder == "password" ? "password" : "text"}
      />
      <img
        src={!isPasVisible ? eye : eye_off}
        onClick={() => setIsPasVisible(!isPasVisible)}
      />
    </>
  );

  useEffect(() => {
    setFlipped((state) => !state);
  }, [loading]);

  const isFormNotFilled = !name || !email || !password;

  return (
    <section className="signup-page">
      <button className={"login-btn"} onClick={() => navigate("/login")}>
        Login
      </button>

      <div className={styles.container}>
        <a.div
          className={`${styles.c} ${styles.back}`}
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        />

        <div
          className="inputs-wrapper"
          style={{ zIndex: loading ? 0 : 100, opacity: loading ? 0 : 1 }}
        >
          <div className="title-wrapper" children={"Sign Up"} />

          {createInput(name, "name", (e) => setName(e.target.value))}
          {createInput(email, "email", (e) => setEmail(e.target.value))}
          {createInput(password, "password", (e) =>
            setPassword(e.target.value)
          )}

          <div
            className="ok-btn"
            onClick={() => !isFormNotFilled && registerUser()}
            children={"NEXT"}
          />
          <div
            className={`error-message ${!error && "transparent"}`}
            children={error}
          />
        </div>

        {loading && <div className="spin-wrapper" children={<Spin />} />}

        <a.div
          className={`${styles.c} ${styles.front}`}
          style={{
            opacity,
            transform,
            rotateX: "180deg",
          }}
        />
      </div>
    </section>
  );
};

export default SignupPage;
