const url = import.meta.env.VITE_URL;
import { FC } from "react";
import "./index.sass";
const SignupPage: FC = () => {
  const registerUser = async () => {
    const response = await fetch(`${url}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(userData),
    });
  };

  const handleClick = () => {
    registerUser();
  };

  return (
    <section className="signup-page">
      <div className="inputs-wrapper">
        <h1>Sign Up</h1>
        <input placeholder="email" />
        <input placeholder="password" />
        <div className="ok-btn" onClick={handleClick}>
          NEXT
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
