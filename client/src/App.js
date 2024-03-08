import "./App.css";
import EventList from "./EventList";
import NavBar from "./NavBar";
import UserProvider from "./UserProvider";

function App() {
  return (
    <UserProvider>
      <NavBar />
      <div className="App">
        <EventList />
      </div>
    </UserProvider>
  );
}

export default App;
