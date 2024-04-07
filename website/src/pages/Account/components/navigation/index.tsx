import "./index.sass";
import { FC, useState } from "react";
import NavItem from "./components/NavItem";
import Logout from "../../../../icons/logout.svg?react";
import { useNavigate, useLocation } from "react-router";
import Activity from "../../../../icons/timer.svg?react";
import Profile from "../../../../icons/profile.svg?react";
import Deposits from "../../../../icons/deposits.svg?react";

const Navigation: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openedElement, setOpenedElement] = useState<string>();

  const handleElementClick = (parent: string, child: string) => {
    navigate(`/account/${parent}/${child}`);
  };

  const handleStyle = (parent: string, child: string) => {
    if (pathname == `/account/${parent}/${child}`) {
      return { backgroundColor: "#677685", color: "#fff" };
    }
    return {};
  };

  return (
    <section className={"navigation"}>
      <div className={"logo"} children={"ALBENTA"} />

      <nav className={"first-menu"}>
        <NavItem
          name={"Deposits"}
          label={<Deposits />}
          openedElement={openedElement}
          setOpenedElement={setOpenedElement}
        >
          <div
            className={"nav-subitem"}
            style={handleStyle("deposits", "plans")}
            onClick={() => handleElementClick("deposits", "plans")}
            children={"Plans"}
          />

          <div
            className={"nav-subitem"}
            style={handleStyle("deposits", "your-deposits")}
            onClick={() => handleElementClick("deposits", "your-deposits")}
            children={"Your Deposits"}
          />
        </NavItem>

        <NavItem
          name={"History"}
          label={<Activity />}
          openedElement={openedElement}
          setOpenedElement={setOpenedElement}
        >
          <div
            className={"nav-subitem"}
            onClick={() => handleElementClick("history", "activity-log")}
            style={handleStyle("history", "activity-log")}
            children={"Activity Log"}
          />

          <div
            className={"nav-subitem"}
            onClick={() => handleElementClick("history", "income")}
            style={handleStyle("history", "income")}
            children={"Income"}
          />
        </NavItem>
      </nav>

      <nav className={"second-menu"}>
        <NavItem name={"Profile"} label={<Profile />} />
        <NavItem name={"Log out"} label={<Logout />} />
      </nav>
    </section>
  );
};
export default Navigation;
