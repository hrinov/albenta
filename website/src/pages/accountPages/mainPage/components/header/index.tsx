import { FC } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { RootStateInterface, clearStates } from "../../../../../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import watch from "../../../../../icons/timer.svg";

interface PropsInterface {
  handleActivityModal: (arg: boolean) => void;
}

const Header: FC<PropsInterface> = ({ handleActivityModal }) => {
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
    <>
      <header>
        <div className="logo">ALBENTA</div>
        <div
          className={`logout-block ${
            user?.balance == undefined ? "skeleton" : ""
          }`}
        >
          {user?.name || ""}
          <div
            className={`balance ${
              user?.balance == undefined ? "transparent" : ""
            }`}
          >
            Balance: {user?.balance || ""}$
          </div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <button
        className={`activity-btn ${
          user?.balance == undefined ? "skeleton" : ""
        }`}
        onClick={() => handleActivityModal(true)}
      >
        <img src={watch} className={user?.balance == undefined ? "hide" : ""} />
        ACTIVITY LOG
      </button>
    </>
  );
};

export default Header;
