import { FC } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import { RootStateInterface, clearStates } from "../../../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AccountMainPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const handleLogout = () => {
    dispatch(clearStates());
    navigate("/login");
  };
  console.log(user);
  return (
    <section className="main-page">
      <header>
        <div className="logo">ALBENTA</div>
        <div className="logout-block">
          {user.name}
          <div className="balance">
            Balance:
            {user.balance}$
          </div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
    </section>
  );
};

export default AccountMainPage;
