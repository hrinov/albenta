import "./index.sass";
import notFoundImage from "../../images/404.webp";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../redux/slice";
import { useNavigate } from "react-router-dom";
const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const isUserAuthorized = accessToken && refreshToken;
  const handleClick = () =>
    navigate(`${isUserAuthorized ? "/account" : "/login"}`);
  return (
    <section className="not-found-page">
      <div className="image-holder">
        <img src={notFoundImage} />
      </div>
      <div className="btn" onClick={handleClick}>
        BACK TO {isUserAuthorized ? "ACCOUNT PAGE" : "LOGIN PAGE"}
      </div>
    </section>
  );
};

export default NotFoundPage;
