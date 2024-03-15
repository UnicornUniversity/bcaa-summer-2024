import { useState } from "react";
import { EventListContext } from "./EventListContext.js";

function EventListProvider({ children }) {
  const [eventList, setEventList] = useState(getDefaultEventList());

  function setWillAttend(eventId, userId) {
    const event = eventList.find((event) => event.id === eventId);
    if (event) {
      if (event.willNotAttend.includes(userId))
        event.willNotAttend.splice(event.willNotAttend.indexOf(userId), 1);
      if (!event.willAttend.includes(userId)) event.willAttend.push(userId);
    }
    setEventList([...eventList]);
  }

  function setWillNotAttend(eventId, userId) {
    const event = eventList.find((event) => event.id === eventId);
    if (event) {
      if (event.willAttend.includes(userId))
        event.willAttend.splice(event.willAttend.indexOf(userId), 1);
      if (!event.willNotAttend.includes(userId))
        event.willNotAttend.push(userId);
    }
    setEventList([...eventList]);
  }

  function setNotDecided(eventId, userId) {
    const event = eventList.find((event) => event.id === eventId);
    if (event) {
      if (event.willAttend.includes(userId))
        event.willAttend.splice(event.willAttend.indexOf(userId), 1);
      if (event.willNotAttend.includes(userId))
        event.willNotAttend.splice(event.willNotAttend.indexOf(userId), 1);
    }
    setEventList([...eventList]);
  }

  function setGuests(eventId, userId, numberOfGuests) {
    const event = eventList.find((event) => event.id === eventId);
    if (event) {
      event.guests = event.guests.filter((guest) => guest !== userId);
      for (let i = 0; i < numberOfGuests; i++) event.guests.push(userId);
    }
    setEventList([...eventList]);
  }

  const value = {
    eventList,
    handlerMap: { setWillAttend, setWillNotAttend, setNotDecided, setGuests },
  };

  return (
    <EventListContext.Provider value={value}>
      {children}
    </EventListContext.Provider>
  );
}

function getDefaultEventList() {
  return [
    {
      id: "0",
      date: "2024-02-28T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: ["aragorn"],
      willNotAttend: ["gimli"],
      guests: [],
    },
    {
      id: "a",
      date: "2024-03-06T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: ["aragorn"],
      willNotAttend: ["gimli"],
      guests: [],
    },
    {
      id: "b",
      date: "2024-03-13T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: ["aragorn"],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "c",
      date: "2024-03-20T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "d",
      date: "2024-03-27T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "e",
      date: "2024-04-03T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "f",
      date: "2024-04-10T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "g",
      date: "2024-04-17T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "h",
      date: "2024-04-24T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "i",
      date: "2024-05-01T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "j",
      date: "2024-05-08T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "k",
      date: "2024-05-15T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "l",
      date: "2024-05-22T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "m",
      date: "2024-05-29T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
    {
      id: "n",
      date: "2024-06-05T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
      guests: [],
    },
  ];
}

export default EventListProvider;
