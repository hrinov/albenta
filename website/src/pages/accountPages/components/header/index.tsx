const url = import.meta.env.VITE_URL;
import { FC, useEffect, useState } from "react";
import "./index.sass";
import { RootStateInterface } from "../../../../../redux/slice";
import { useSelector } from "react-redux";
import profileDefaultImg from "../../../../images/profile.png";

const Header: FC = () => {
  const [avatar, setAvatar] = useState<string>();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

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
        <div className="logo">ALBENTA</div>
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
