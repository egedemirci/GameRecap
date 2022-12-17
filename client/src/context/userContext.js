import { useState, createContext } from "react";

export const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [user, setUser] = useState(localStorage.getItem("user") ?? null);

  return (
    <UsersContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};
