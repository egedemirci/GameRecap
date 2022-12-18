import SignUpComponent from "../../components/signUpComponent";
import ResponsiveAppBar from "../../components/appbarGame";

export default function SignUpPage() {
  const myStyle = {
    background: "#f1faee",
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
