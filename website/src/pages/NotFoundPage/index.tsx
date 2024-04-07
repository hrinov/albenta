import "./index.sass";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../images/404.webp";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const isUserAuthorized = localStorage.getItem("refreshToken");

  return (
    <section className="not-found-page">
      <div className="image-holder" children={<img src={notFoundImage} />} />
      <div
        className="btn"
        onClick={() =>
          navigate(`${isUserAuthorized ? "/account/deposits/plans" : "/login"}`)
        }
      >
        BACK TO {isUserAuthorized ? "ACCOUNT PAGE" : "LOGIN PAGE"}
      </div>
    </section>
  );
};

export default NotFoundPage;
