import { Navigate, Outlet } from "react-router-dom";
import { UsersContext } from "../context/userContext";
import { useContext, useEffect } from "react";

export default function CheckLogin() {
  const { user, setUser } = useContext(UsersContext);
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));},[setUser])

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
