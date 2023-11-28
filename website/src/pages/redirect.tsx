import { useSelector } from "react-redux";
import { RootStateInterface } from "../../redux/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const isUserAuthorized = accessToken && refreshToken;
  useEffect(() => {
    if (isUserAuthorized) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  }, [isUserAuthorized]);

  return <></>;
};

export default Redirect;
