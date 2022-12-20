import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { GameContextProvider } from "./context/gameContext";
import { UsersContextProvider } from "./context/userContext";
import UpdateGamePage from "./routes/game/updateGamePage";
import LoginPage from "./routes/user/LoginPage";
import SignUpPage from "./routes/user/signUpPage";
import GamesPage from "./routes/game/GamesPage";
import IndividualGameComponent from "./components/game/IndividualGameComponent";
import UserProfile from "./components/profilePage";
import PlaylistPage from "./routes/playlist/PlaylistPage";
import IndividualPlaylistPage from "./routes/playlist/IndividualPlaylistPage";
import Discover from "./components/discover";
import AdminPage from "./components/admin/AdminComponent";
import UserPage from "./components/admin/AdminComponent";
import CategoryPage from "./routes/category/CategoryPage";
import DlcPage from "./routes/dlc/DLCPage";
import DevelopmentStudioPage from "./routes/devstudio/DevelopmentStudioPage";
import LanguagePage from "./routes/language/LanguagePage";
import UserAdmin from "./components/UserAdminPage";
import SubServicePage from "./routes/subservice/SubServicePage";
import OnlineStoresPage from "./routes/store/OnlineStorePage";
import PlatformPage from "./routes/platform/PlatformPage";
import CheckLogin from "./components/CheckLogin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IndividualDLCComponent from "./components/dlc/IndividualDLCComponents";
import CreatePlaylistPage from "./routes/playlist/CreatePlaylistPage";
import PublishingStudioPage from "./routes/pubstudio/PublishingStudioPage";
import PlaylistAdminPage from "./routes/playlist/PlaylistAdminPage";
import ReviewsPage from "./routes/review/ReviewsPage";

class App extends Component {
  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#D3EDEE",
        },
        secondary: {
          main: "#a8dadc",
        },
        third: {
          main: "#457b9d",
        },
        fourth: {
          main: "#e63946",
        },
        fifth: {
          main: "#a8dadc",
        },
      },
    });

    const myStyle = {
      background: "#f1faee",
      fontSize: "24px",
      backgroundSize: "cover",
      height: "100vh",
    };
    return (
      <GameContextProvider>
        <UsersContextProvider>
          <ThemeProvider theme={theme}>
            <div style={myStyle}>
              <Router>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route
                    path="/games/:id/update"
                    element={<UpdateGamePage />}
                  />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  {/* Logged In Routes */}
                  <Route element={<CheckLogin />}>
                    <Route path="/games">
                      <Route index element={<GamesPage />} />
                      <Route path=":id" element={<IndividualGameComponent />} />
                    </Route>
                    <Route path="/dlc">
                      <Route path=":id" element={<IndividualDLCComponent />} />
                    </Route>
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/adminpage" element={<AdminPage />} />
                    <Route path="/userpage" element={<UserPage />} />
                    <Route
                      path="/categorypage"
                      element={<CategoryPage></CategoryPage>}
                    />
                    <Route
                      path="/developmentstudiopage"
                      element={<DevelopmentStudioPage></DevelopmentStudioPage>}
                    />
                    <Route
                      path="/publishingstudiospage"
                      element={<PublishingStudioPage />}
                    />
                    <Route path="/dlcpage" element={<DlcPage></DlcPage>} />
                    <Route
                      path="/languagepage"
                      element={<LanguagePage></LanguagePage>}
                    />
                    <Route
                      path="/useradminpage"
                      element={<UserAdmin></UserAdmin>}
                    />
                    <Route path="/subservice" element={<SubServicePage />} />
                    <Route
                      path="/onlinestorepage"
                      element={<OnlineStoresPage></OnlineStoresPage>}
                    />
                    <Route
                      path="/platformpage"
                      element={<PlatformPage></PlatformPage>}
                    />
                    <Route path="/playlists/:id" element={<PlaylistPage />} />
                    <Route
                      path="/playlist/:id"
                      element={<IndividualPlaylistPage />}
                    />
                    <Route path="playlists" element={<PlaylistAdminPage />} />
                    <Route
                      path="/playlist/create"
                      element={<CreatePlaylistPage />}
                    />
                    <Route path="/discover" element={<Discover />} />
                    <Route
                      path="/reviews"
                      element={<ReviewsPage></ReviewsPage>}
                    />
                  </Route>
                </Routes>
              </Router>
            </div>
          </ThemeProvider>
        </UsersContextProvider>
      </GameContextProvider>
    );
  }
}

export default App;
