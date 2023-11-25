const url = import.meta.env.VITE_URL;
import { FC, useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
const SignupPage: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const registerUser = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    let responseJSON = await fetch(`${url}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = (await responseJSON.json()) as { success: boolean };

    if (response?.success) {
      navigate("/account");
    }
  };

  const handleClick = () => {
    registerUser();
  };

  return (
    <section className="signup-page">
      <div className="inputs-wrapper">
        <h1>Sign Up</h1>
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

export default SignupPage;
