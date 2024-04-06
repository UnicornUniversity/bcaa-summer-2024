import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import EventCard from "./EventCard";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";

function EventList() {
  const { eventList } = useContext(EventListContext);
  const [showEventForm, setShowEventForm] = useState(false);

  const filteredEventList = eventList.filter(
    (event) => new Date(event.date) > new Date()
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowEventForm(true)}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
          událost
        </Button>
        <Button variant="success" disabled>
          <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} />{" "}
          Nové události
        </Button>
      </div>
      {showEventForm ? <EventForm setShowEventForm={setShowEventForm} /> : null}
      {filteredEventList.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </Container>
  );
}

export default EventList;
