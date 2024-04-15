import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [userListDto, setUserListDto] = useState({
    state: "ready",
    data: null,
  });
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setUserListDto((current) => ({ ...current, state: "loading" }));
    fetch(`http://localhost:8000/user/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setUserListDto({ state: "error", error: responseJson.error });
      } else {
        setUserListDto({ state: "ready", data: responseJson });
      }
    });
  }, []);

  const value = {
    userList: userListDto.data || [],
    loggedInUser: loggedInUser
      ? (userListDto.data || []).find((user) => user.id === loggedInUser)
      : null,
    handlerMap: {
      login: setLoggedInUser,
      logout: () => setLoggedInUser(null),
    },
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}

export default UserProvider;
