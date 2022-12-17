import IndividualGameComponent from "../../components/game/IndividualGameComponent";

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
