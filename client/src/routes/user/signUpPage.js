import SignUpComponent from "../../components/SignUpComponent";
import ResponsiveAppBar from "../../components/appbarGame";

export default function SignUpPage() {
  const myStyle = {
    background: "#D3EDEE",
    height: "100vh",
    fontSize: "24px",
    backgroundSize: "cover",
  };
  return (
    <div style={myStyle}>
      <ResponsiveAppBar />
      <SignUpComponent />
    </div>
  );
}
