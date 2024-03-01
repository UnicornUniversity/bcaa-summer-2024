import { useState } from "react";
import EventCard from "./EventCard";

function EventList() {
  const [showFutureOnly, setShowFutureOnly] = useState(true);

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

  const eventList = [
    {
      id: "0",
      date: "2024-02-28",
      name: "Volleyball",
      willAttend: ["aragorn"],
      willNotAttend: ["gimli"],
    },
    {
      id: "a",
      date: "2024-03-06",
      name: "Volleyball",
      willAttend: ["aragorn"],
      willNotAttend: ["gimli"],
    },
    {
      id: "b",
      date: "2024-03-13",
      name: "Volleyball",
      willAttend: ["aragorn"],
      willNotAttend: [],
    },
    {
      id: "c",
      date: "2024-03-20",
      name: "Volleyball",
      willAttend: [],
      willNotAttend: [],
    },
  ];

  const filteredEventList = showFutureOnly
    ? eventList.filter((event) => new Date(event.date) > new Date())
    : eventList;

  return (
    <div>
      <h1>Event List</h1>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => setShowFutureOnly((current) => !current)}
      >
        {showFutureOnly ? "Show All" : "Show Future Only"}
      </button>
      {filteredEventList.map((event) => {
        return <EventCard key={event.id} event={event} userList={userList} />;
      })}
    </div>
  );
}

export default EventList;
