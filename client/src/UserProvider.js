import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadStatus, setLoadStatus] = useState("ready");

  useEffect(() => {
    setLoadStatus("loading");
    setTimeout(() => {
      setLoadStatus("ready");
    }, 10000);
  }, []);

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
      logout: () => setLoggedInUser(null),
    },
  };

  return (
    <>
      {loadStatus === "loading" && <div>Loading...</div>}
      {loadStatus === "ready" && (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
      )}
    </>
  );
}

export default UserProvider;
