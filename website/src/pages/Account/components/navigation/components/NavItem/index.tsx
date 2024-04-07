import "./index.sass";
import { useLocation, useNavigate } from "react-router";
import React, { FC, useEffect, useRef, useState } from "react";
import Chevron from "../../../../../../icons/chevron_down.svg?react";

const NavItem: FC<NavItemInterface> = ({
  name,
  label,
  children,
  openedElement,
  setOpenedElement,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navItemRef = useRef<HTMLDivElement>(null);

  const [blockHeight, setBlockHeight] = useState<number>();

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
        localStorage.clear();
        window.location.href = window.location.origin + "/login";
        break;
      default:
        navigate(`/account/${name.toLowerCase().replace(" ", "-")}`);
    }
  };

  const handleStyle = () =>
    pathname.includes(`/account/${name.toLowerCase()}`) && !children
      ? { backgroundColor: "#677685", color: "#fff" }
      : {};

  const isOpen =
    (!openedElement && pathname?.includes(`/account/${name.toLowerCase()}`)) ||
    openedElement == name?.toLowerCase();

  useEffect(() => {
    if (navItemRef?.current) {
      const childrenAmount = React.Children.count(children) || 0;
      const navElementHeight = parseFloat(
        window.getComputedStyle(navItemRef.current).height
      );
      setBlockHeight((childrenAmount + 1) * navElementHeight);
    }
  }, [navItemRef]);

  return (
    <div className={"wrapper"} style={isOpen ? { height: blockHeight } : {}}>
      <div
        ref={navItemRef}
        style={handleStyle()}
        onClick={handleElementClick}
        className={`nav-item ${isOpen && "active"} ${name.toLowerCase()}`}
      >
        <div className={"description"}>
          <div
            className={`label-wrapper ${isOpen && "open"}`}
            children={label}
          />
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
