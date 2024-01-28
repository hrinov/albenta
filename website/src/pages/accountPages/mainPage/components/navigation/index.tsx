import { FC } from "react";
import { useNavigate } from "react-router";
import "./index.sass";

const Navigation: FC = () => {
  const navigate = useNavigate();

  return (
    <section className={"navigation"}>
      <nav className={"first-menu"}></nav>
      <nav className={"second-menu"}></nav>
    </section>
  );
};
export default Navigation;
