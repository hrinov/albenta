import "./index.sass";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { useSpring, a } from "react-spring";
import eye from "../../icons/eye.svg";
import { requestHandler } from "../../utils";
import styles from "./animation.module.sass";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/slice";
import { FC, useEffect, useState } from "react";
import eye_off from "../../icons/eye-off.svg";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasVisible, setIsPasVisible] = useState<boolean>(false);

  const loginUser = async () => {
    setError("");
    setLoading(true);
    const data = { email, password };

    const response: MeResponse = await requestHandler("login", "POST", data);

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
        type={isPasVisible || placeholder == "email" ? "text" : "password"}
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

  const isFormNotFilled = !email || !password;

  return (
    <section className="login-page">
      <button
        children={"Sign Up"}
        className={"signup-btn"}
        onClick={() => navigate("/signup")}
      />

      <div className={styles.container}>
        <a.div
          className={`${styles.c} ${styles.back}`}
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        />

        <div
          className="inputs-wrapper"
          style={{ zIndex: loading ? 0 : 100, opacity: loading ? 0 : 1 }}
        >
          <div className="title-wrapper" children={"Login"} />
          {createInput(email, "email", (e) => setEmail(e.target.value))}
          {createInput(password, "password", (e) =>
            setPassword(e.target.value)
          )}
          <div
            className="ok-btn"
            onClick={() => !isFormNotFilled && loginUser()}
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

export default LoginPage;
