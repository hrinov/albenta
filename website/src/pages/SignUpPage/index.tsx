import { FC } from "react";
import "./index.sass";
const SignupPage: FC = () => {
  return (
    <section className="signup-page">
      <div className="inputs-wrapper">
        <h1>Sign Up</h1>
        <input placeholder="email" />
        <input placeholder="password" />
      </div>
    </section>
  );
};

export default SignupPage;
