import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { GameContextProvider } from "./context/gameContext";
import UpdatePage from "./routes/updatePage";
import SignUpPage from "./routes/signUpPage";
import LoginPage from "./routes/LoginPage";
import GamesPage from "./routes/GamesPage";
import IndividualGameComponent from "./components/IndividualGameComponent";

class App extends Component {
  render() {
    const myStyle = {
      background: "#D3EDEE",
      height: "100vh",
      fontSize: "24px",
      backgroundSize: "cover",
    };
    return (
      <GameContextProvider>
        <div style={myStyle}>
          <Router>
            <Routes>
              <Route path="/games/:id/update" element={<UpdatePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/games">
                <Route index element={<GamesPage />} />
                <Route path=":id" element={<IndividualGameComponent />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </GameContextProvider>
    );
  }
}

export default App;
