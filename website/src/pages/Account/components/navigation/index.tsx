import { FC, useState } from "react";
import NavItem from "./components/NavItem";
import { useNavigate, useLocation } from "react-router";
import activity from "../../../../icons/activity.svg";
import deposits from "../../../../icons/deposits.svg";
import "./index.sass";

const Navigation: FC = () => {
  const navigate = useNavigate();
  const [openedElement, setOpenedElement] = useState<string>();
  const { pathname } = useLocation();

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
      <div className={"logo"}>ALBENTA</div>
      <nav className={"first-menu"}>
        <NavItem
          name={"Deposits"}
          label={<img src={deposits} />}
          openedElement={openedElement}
          setOpenedElement={setOpenedElement}
        >
          <div
            className={"nav-subitem"}
            onClick={() => handleElementClick("deposits", "plans")}
            style={handleStyle("deposits", "plans")}
          >
            Plans
          </div>
          <div
            className={"nav-subitem"}
            onClick={() => handleElementClick("deposits", "your-deposits")}
            style={handleStyle("deposits", "your")}
          >
            Your Deposits
          </div>
        </NavItem>
        <NavItem
          name={"History"}
          label={<img src={activity} />}
          openedElement={openedElement}
          setOpenedElement={setOpenedElement}
        >
          <div
            className={"nav-subitem"}
            onClick={() => handleElementClick("history", "activity-log")}
            style={handleStyle("history", "activity-log")}
          >
            Activity Log
          </div>
          <div
            className={"nav-subitem"}
            onClick={() => handleElementClick("history", "income")}
            style={handleStyle("history", "income")}
          >
            Income
          </div>
        </NavItem>
      </nav>
      <nav className={"second-menu"}>
        <NavItem name={"Profile"} label={<img src={activity} />} />
        <NavItem name={"Log out"} label={<img src={activity} />} />
      </nav>
    </section>
  );
};
export default Navigation;
