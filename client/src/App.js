import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import MainPage from "./components/mainPage";

class App extends Component {
 
  render() {
    const myStyle={
      background: "#D3EDEE",
      height:'100vh',
      fontSize:'24px',
      backgroundSize: 'cover',
  };

    return (    
        <div style = {myStyle}>
        <Router>
          <Routes>
                <Route path="/" element={<MainPage/>}/>        

            </Routes> 
          </Router>       
        </div>
 
    );
  }
}
    
export default App;
