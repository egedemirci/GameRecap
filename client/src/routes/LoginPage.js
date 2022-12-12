import ResponsiveAppBar from "../components/appbarGame";
import LoginComponent from "../components/LoginComponent";

export default function LoginPage() {
  const myStyle = {
    background: "#D3EDEE",
    height: "100vh",
    fontSize: "24px",
    backgroundSize: "cover",
  };
  return (
    <div style={myStyle}>
      <ResponsiveAppBar />
      <LoginComponent />
    </div>
  );
}
