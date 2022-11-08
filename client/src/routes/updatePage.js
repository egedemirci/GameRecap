import React from "react";
import UpdateGame from "../components/updateGame";
 

const myStyle={
  background: "#1d3557",
  height:'100vh',
  fontSize:'24px',
  backgroundSize: 'cover',
};

const UpdatePage = () => {
  return (
    <div style = {myStyle}>
      <UpdateGame />
    </div>
  );
};
 
export default UpdatePage;