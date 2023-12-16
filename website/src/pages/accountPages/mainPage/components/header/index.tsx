import { FC } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { RootStateInterface, clearStates } from "../../../../../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const removeTokensFromLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  const handleLogout = () => {
    removeTokensFromLocalStorage();
    dispatch(clearStates());
    navigate("/login");
  };

  return (
    <header>
      <div className="logo">ALBENTA</div>
      <div
        className={`logout-block ${
          user?.balance == undefined ? "skeleton" : "skeleton"
        }`}
      >
        {user?.name || ""}
        <div
          className={`balance ${
            user?.balance == undefined ? "transparent" : "transparent"
          }`}
        >
          Balance: {user?.balance || ""}$
        </div>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
