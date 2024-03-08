import { useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const userList = [
    {
      id: "aragorn",
      name: "Aragorn",
    },
    {
      id: "legolas",
      name: "Legolas",
    },
    {
      id: "gimli",
      name: "Gimli",
    },
  ];
  const value = {
    userList,
    loggedInUser: loggedInUser
      ? userList.find((user) => user.id === loggedInUser)
      : null,
    handlerMap: {
      login: setLoggedInUser,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
// Path: client/src/UserProvider.js
