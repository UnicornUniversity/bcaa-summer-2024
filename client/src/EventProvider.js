import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { EventContext } from "./EventContext.js";

function EventProvider({ children }) {
  const [eventLoadObject, setEventLoadObject] = useState({
    state: "pending",
    error: null,
    data: null,
  });
  const location = useLocation();

  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, []);
  /* eslint-enable */

  async function handleLoad() {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/event/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();

    if (response.status < 400) {
      setEventLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
    }
  }

  async function handleCreateMessage(dtoIn) {
    const response = await fetch(`http://localhost:8000/message/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      handleLoad();
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
    }
  }

  const value = {
    state: eventLoadObject.state,
    event: eventLoadObject.data,
    handlerMap: { handleCreateMessage },
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export default EventProvider;
