import { FC } from "react";
import Header from "./components/header";
import Deposits from "./components/deposits";
import "./index.sass";

const AccountMainPage: FC = () => {
  return (
    <main className="main-page">
      <div className="container">
        <Header />
        <Deposits />
      </div>
    </main>
  );
};

export default AccountMainPage;
