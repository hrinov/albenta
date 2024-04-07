import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const isUserAuthorized = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (isUserAuthorized) {
      navigate("/account/deposits/plans");
    } else {
      navigate("/login");
    }
  }, [isUserAuthorized]);

  return <></>;
};

export default Redirect;
