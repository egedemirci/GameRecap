import ResponsiveAppBar from "../components/appbarGame.js";
import IndividualGameComponent from "../components/IndividualGameComponent";

export default function IndividualGamePage() {
  const myStyle = {
    background: "#D3EDEE",
    height: "100vh",
    fontSize: "24px",
    backgroundSize: "cover",
  };
  const content = (
    <div style={myStyle}>
      <IndividualGameComponent />
    </div>
  );
  return content;
}
