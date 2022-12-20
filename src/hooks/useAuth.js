import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const { is_login } = useSelector((state) => state.user);

  useEffect(() => {
    if (!is_login) {
      navigate("/login");
    }
  }, []);

  return <></>;
};

export default useAuth;
