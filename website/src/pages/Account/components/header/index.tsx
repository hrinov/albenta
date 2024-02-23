const url = import.meta.env.VITE_URL;
import { FC, useEffect, useState } from "react";
import "./index.sass";
import { RootStateInterface } from "../../../../../redux/slice";
import { useSelector } from "react-redux";
import profileDefaultImg from "../../../../images/profile.png";
import { useLocation } from "react-router-dom";

const Header: FC = () => {
  const [avatar, setAvatar] = useState<string>();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const { pathname } = useLocation();
  const pathElements = pathname.split("/");
  const pathIdentifier = pathElements[pathElements.length - 1]
    .toUpperCase()
    .replace("-", " ");

  useEffect(() => {
    setAvatar(
      user?.avatar
        ? `${url}/api/avatar?filename=${user?.avatar}`
        : profileDefaultImg
    );
  }, [user]);

  return (
    <>
      <header>
        <div className="page-name">{pathIdentifier}</div>
        <div
          className={`info-block ${
            user?.balance == undefined ? "skeleton" : ""
          }`}
        >
          <img
            src={avatar}
            className={`${user?.balance == undefined ? "hide" : ""}`}
          />
          {user?.name || ""}
          <div
            className={`balance ${
              user?.balance == undefined ? "transparent" : ""
            }`}
          >
            Balance: {user?.balance || ""}$
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
