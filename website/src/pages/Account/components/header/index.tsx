import "./index.sass";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import profileDefaultImg from "../../../../images/profile.png";

const Header: FC = () => {
  const { pathname } = useLocation();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const [avatar, setAvatar] = useState<string>();

  const pathElements = pathname.split("/");
  const pathIdentifier = pathname
    .split("/")
    [pathElements.length - 1].replace("-", " ")
    .toUpperCase();

  useEffect(() => {
    if (user?.balance != undefined) {
      setAvatar(user?.avatar ? user?.avatar : profileDefaultImg);
    }
  }, [user]);

  return (
    <header>
      <div className={"content-wrapper"}>
        {pathIdentifier}
        <div
          className={`info-block ${
            user?.balance == undefined ? "transparent" : ""
          }`}
        >
          <img
            src={avatar}
            className={`${user?.balance == undefined ? "transparent" : ""}`}
          />
          <div className={"name"}>{user?.name || ""}</div>
          <div
            className={`balance ${
              user?.balance == undefined ? "transparent" : ""
            }`}
          >
            Balance: <span children={`${user?.balance || ""}$`} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
