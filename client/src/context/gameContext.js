import React, { useState, createContext } from "react";
 
export const GameContext = createContext();
 
export const GameContextProvider = (props) => {
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState(null);
 
  const addGames = (game) => {
    setGames([...games, game]);
  };

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
        addGames,
        selectedGames,
        setSelectedGames,

      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
