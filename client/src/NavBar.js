import { useContext } from "react";
import { UserContext } from "./UserContext";
import Icon from "@mdi/react";
import { mdiVolleyball } from "@mdi/js";

function NavBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);

  // temporary solution to enable login/logout
  const userMenuItemList = userList.map((user) => (
    <li key={user.id}>
      <div className="dropdown-item" onClick={() => handlerMap.login(user.id)}>
        {user.name}
      </div>
    </li>
  ));
  if (loggedInUser) {
    userMenuItemList.push(
      <li>
        <hr class="dropdown-divider" />
      </li>
    );
    userMenuItemList.push(
      <li>
        <div className="dropdown-item" onClick={() => handlerMap.logout()}>
          {"Odhlas se"}
        </div>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand" style={componentStyle()}>
      <div className="container-fluid">
        <a className="navbar-brand me-auto d-flex text-light" href="/">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon path={mdiVolleyball} size={1} color={"white"} />
            VOLEJBALALÁCI
          </div>
        </a>
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item dropdown dropstart">
            <div
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {loggedInUser ? loggedInUser.name : "Přihlaš se"}
            </div>
            <ul className="dropdown-menu">{userMenuItemList}</ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function componentStyle() {
  return { backgroundColor: "#d63232" };
}

export default NavBar;
