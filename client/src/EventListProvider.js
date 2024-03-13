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

  const value = {
    eventList,
    handlerMap: { setWillAttend, setWillNotAttend, setNotDecided },
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
    },
    {
      id: "a",
      date: "2024-03-06T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: ["aragorn"],
      willNotAttend: ["gimli"],
    },
    {
      id: "b",
      date: "2024-03-13T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: ["aragorn"],
      willNotAttend: [],
    },
    {
      id: "c",
      date: "2024-03-20T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "d",
      date: "2024-03-27T19:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "e",
      date: "2024-04-03T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "f",
      date: "2024-04-10T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "g",
      date: "2024-04-17T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "h",
      date: "2024-04-24T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "i",
      date: "2024-05-01T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "j",
      date: "2024-05-08T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "k",
      date: "2024-05-15T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "l",
      date: "2024-05-22T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "m",
      date: "2024-05-29T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
    {
      id: "n",
      date: "2024-06-05T18:30:00.000Z",
      name: "Volejbal Třebízkého",
      willAttend: [],
      willNotAttend: [],
    },
  ];
}

export default EventListProvider;
