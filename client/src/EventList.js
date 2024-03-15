import { useContext } from "react";
import EventCard from "./EventCard";
import { EventListContext } from "./EventListContext.js";

function EventList() {
  const { eventList } = useContext(EventListContext);

  const filteredEventList = eventList.filter(
    (event) => new Date(event.date) > new Date()
  );

  return (
    <div>
      {filteredEventList.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;
