import { Navigate, Outlet } from "react-router-dom";

export default function CheckLogin() {
  const user = localStorage.getItem("user");
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
