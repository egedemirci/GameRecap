import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/mainPage";
import { GameContextProvider } from "./context/gameContext";
import UpdatePage from "./routes/updatePage";
import AdminPage from "./components/AdminPage";

import CategoryPage from "./components/CategoryPage";
import DlcPage from "./components/DlcPage";
import DevelopmentStudioPage from "./components/DevelopmentStudioPage";
import LanguagePage from "./components/LanguagePage";
import UserAdmin from "./components/UserAdminPage";
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
              <Route path="/" element={<MainPage />} />
              <Route path="/adminpage" element={<AdminPage />} />

              <Route path="/categorypage" element={<CategoryPage></CategoryPage>} />
              <Route path="/developmentstudiopage" element={<DevelopmentStudioPage></DevelopmentStudioPage>} />
              <Route path="/dlcpage" element={<DlcPage></DlcPage>} />
              <Route path="/languagepage" element={<LanguagePage></LanguagePage>} />
              <Route path="/useradminpage" element={<UserAdmin></UserAdmin>} />



              <Route path="/games/:id/update" element={<UpdatePage />} />
            </Routes>
          </Router>
        </div>
      </GameContextProvider>
    );
  }
}

export default App;
