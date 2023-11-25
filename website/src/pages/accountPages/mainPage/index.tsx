import { FC } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";

const AccountMainPage: FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <section className="main-page">
      <header>
        <div className="logo">ALBENTA</div>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </header>
    </section>
  );
};

export default AccountMainPage;
