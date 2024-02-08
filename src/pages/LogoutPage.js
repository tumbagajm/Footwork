import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../UserContext";

 const LogoutPage = () => {
  // localStorage.clear();
  const { unsetUser, setUser } = useContext(UserContext);

  // Clear information to the local storage
  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      email: null,
      isAdmin: null,
    });
  }, [setUser]);

  return <Navigate to="/login" />;
}

export default LogoutPage;
