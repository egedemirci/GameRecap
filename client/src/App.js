import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import MainPage from "./components/mainPage";
import { GameContextProvider } from "./context/gameContext";
import UpdatePage from "./routes/updatePage";



class App extends Component {
 
  render() {
    const myStyle={
      background: "#D3EDEE",
      height:'100vh',
      fontSize:'24px',
      backgroundSize: 'cover',
  };

    return (    
      <GameContextProvider>
        <div style = {myStyle}>
        <Router>
          <Routes>
                <Route path="/" element={<MainPage/>}/>        
                <Route
              path="/games/:id/update"
              element={<UpdatePage/>}
            />
            </Routes> 
          </Router>       
        </div>
      </GameContextProvider>

 
    );
  }
}
    
export default App;
