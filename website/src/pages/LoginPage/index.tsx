import { FC } from "react";
import "./index.sass";
const LoginPage: FC = () => {
  return (
    <section className="login-page">
      <div className="inputs-wrapper">
        <h1>Login</h1>
        <input placeholder="email" />
        <input placeholder="password" />
        <div className="ok-btn">NEXT</div>
      </div>
    </section>
  );
};

export default LoginPage;
