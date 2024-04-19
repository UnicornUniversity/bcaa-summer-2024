import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { EventContext } from "./EventContext.js";

function EventProvider({ children }) {
  const [eventLoadObject, setEventLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();
  console.log(location);

  const [searchParams] = useSearchParams();

  console.log(searchParams.get("id"));

  useEffect(() => {
    handleLoad();
  }, []);

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
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  const value = {
    event: eventLoadObject.data,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export default EventProvider;
