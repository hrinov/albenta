import React, { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Chevron from "../../../../../../icons/chevron_down.svg?react";
import "./index.sass";
import { NavItemInterface } from "../../../../../../../types";

const NavItem: FC<NavItemInterface> = ({
  name,
  label,
  openedElement,
  setOpenedElement,
  children,
}) => {
  const { pathname } = useLocation();
  const [blockHeight, setBlockHeight] = useState<number>();
  const navItemRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleElementClick = () => {
    if (children && openedElement !== name.toLowerCase()) {
      setOpenedElement!(name.toLowerCase());
      return;
    } else if (children) {
      setOpenedElement!(undefined);
      return;
    }
    switch (name) {
      case "Log out":
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = window.location.origin + "/login";
        break;
      default:
        navigate(`/account/${name.toLowerCase().replace(" ", "-")}`);
    }
  };

  const handleStyle = () => {
    if (pathname.includes(`/account/${name.toLowerCase()}`) && !children) {
      return { backgroundColor: "#677685", color: "#fff" };
    }
    return {};
  };

  const isOpen =
    (!openedElement && pathname?.includes(`/account/${name.toLowerCase()}`)) ||
    openedElement == name?.toLowerCase();

  useEffect(() => {
    if (navItemRef?.current) {
      const childrenAmount = React.Children.count(children) || 0;
      console.log(window.getComputedStyle(navItemRef.current).paddingTop);
      const navElementHeight = parseFloat(
        window.getComputedStyle(navItemRef.current).height
      );
      console.log(navElementHeight);
      setBlockHeight((childrenAmount + 1) * navElementHeight);
    }
  }, [navItemRef]);

  return (
    <div className={"wrapper"} style={isOpen ? { height: blockHeight } : {}}>
      <div
        className={`nav-item ${isOpen && "active"}`}
        onClick={handleElementClick}
        ref={navItemRef}
        style={handleStyle()}
      >
        <div className={"description"}>
          <div className={`label-wrapper ${isOpen && "open"}`}>{label}</div>
          {name}
        </div>
        {children && (
          <Chevron style={isOpen ? { transform: "rotate(180deg)" } : {}} />
        )}
      </div>
      {children}
    </div>
  );
};
export default NavItem;
