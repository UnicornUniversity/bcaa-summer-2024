import { useContext } from "react";
import { UserContext } from "./UserContext";

function NavBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);

  const userMenuItemList = userList.map((user) => (
    <li key={user.id}>
      <div className="dropdown-item" onClick={() => handlerMap.login(user.id)}>
        {user.name}
      </div>
    </li>
  ));

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">Můj volejbal</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
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
      </div>
    </nav>
  );
}

export default NavBar;
