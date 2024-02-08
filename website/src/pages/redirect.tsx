import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const isUserAuthorized = accessToken && refreshToken;

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
