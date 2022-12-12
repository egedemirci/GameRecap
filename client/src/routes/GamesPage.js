import GameListComponent from "../components/GameListComponent.js";
import ResponsiveAppBar from "../components/appbarGame.js";

export default function GamesPage() {
  return (
    <>
      <ResponsiveAppBar />
      <GameListComponent />
    </>
  );
}
