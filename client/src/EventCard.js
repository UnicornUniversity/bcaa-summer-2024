import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import EventDateTimeBadge from "./EventDateTimeBadge";
import EventDetail from "./EventDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function EventCard({ event, setShowEventForm }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <EventDateTimeBadge event={event} />
      <EventDetail event={event} />
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/eventDetail?id=" + event.id)}
          size={"sm"}
        >
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>
        <Button onClick={() => setShowEventForm(event)} size={"sm"}>
          <Icon path={mdiPencil} size={0.7} />
        </Button>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default EventCard;
