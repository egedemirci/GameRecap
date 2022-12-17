import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../context/userContext";

export default function RequireAuthorization(roles) {
  const rolesArray = roles["roles"];
  const { user } = useContext(UsersContext);
  if (user) {
    if (rolesArray.includes(user.role)) {
      return <Outlet />;
    } else {
      alert("You are not authorized to view this page!");
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
