import Button from "react-bootstrap/esm/Button.js";

import EventDateTimeBadge from "./EventDateTimeBadge";
import EventDetail from "./EventDetail";

function EventCard({ event, setShowEventForm }) {
  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <EventDateTimeBadge event={event} />
      <EventDetail event={event} />
      <Button onClick={() => setShowEventForm(event)}>U</Button>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 40px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default EventCard;
