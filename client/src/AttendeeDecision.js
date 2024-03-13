import Icon from "@mdi/react";
import {
  mdiEmoticonHappyOutline,
  mdiEmoticonSadOutline,
  mdiEmoticonNeutralOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

import { useContext } from "react";
import { UserContext } from "./UserContext";
import { EventListContext } from "./EventListContext";

function AttendeeDecision({ event }) {
  const { loggedInUser } = useContext(UserContext);
  const { handlerMap } = useContext(EventListContext);

  let loggedInUserAttendance;
  let iconPath;
  let color;
  if (loggedInUser && event.willAttend.includes(loggedInUser?.id)) {
    loggedInUserAttendance = "jdu";
    iconPath = mdiEmoticonHappyOutline;
    color = "#69a765";
  } else if (loggedInUser && event.willNotAttend.includes(loggedInUser?.id)) {
    loggedInUserAttendance = "nejdu";
    iconPath = mdiEmoticonSadOutline;
    color = "#ff2216";
  } else {
    loggedInUserAttendance = "nevím";
    iconPath = mdiEmoticonNeutralOutline;
    color = "#ffb447";
  }

  const guestsCount = event.guests.filter(
    (guest) => guest === loggedInUser?.id
  ).length;
  const guestsColor = getGuestsCount(guestsCount);

  return loggedInUser ? (
    <>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={componentStyle(color)}
        >
          <Icon path={iconPath} size={0.8} color={color} />
          {loggedInUserAttendance}
        </button>
        <ul className="dropdown-menu" style={{ minWidth: "88px" }}>
          {decisionButton({
            callFunction: handlerMap.setWillAttend,
            event,
            loggedInUser,
            color: "#69a765",
            text: "jdu",
          })}
          {decisionButton({
            callFunction: handlerMap.setWillNotAttend,
            event,
            loggedInUser,
            color: "#ff2216",
            text: "nejdu",
          })}
          {decisionButton({
            callFunction: handlerMap.setNotDecided,
            event,
            loggedInUser,
            color: "#ffb447",
            text: "nevím",
          })}
        </ul>
      </div>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={componentStyle(guestsColor)}
        >
          <Icon path={mdiPlusCircleOutline} size={0.8} color={guestsColor} />
          {guestsCount}
        </button>
        <ul className="dropdown-menu" style={{ minWidth: "44px" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((numberOfGuests) => {
            return guestsButton({
              callFunction: handlerMap.setGuests,
              event,
              loggedInUser,
              numberOfGuests,
            });
          })}
        </ul>
      </div>
    </>
  ) : null;
}

function componentStyle(color) {
  return {
    border: "none",
    background: "none",
    fontSize: "18px",
    color: color,
    display: "flex",
    alignItems: "center",
    columnGap: "4px",
  };
}

function decisionButton({ callFunction, event, loggedInUser, color, text }) {
  return (
    <li>
      <button
        className="dropdown-item"
        style={{ color }}
        onClick={() => callFunction(event.id, loggedInUser.id)}
      >
        {text}
      </button>
    </li>
  );
}

function guestsButton({ callFunction, event, loggedInUser, numberOfGuests }) {
  return (
    <li key={numberOfGuests.toString()}>
      <button
        className="dropdown-item"
        style={{ color: getGuestsCount(numberOfGuests) }}
        onClick={() => callFunction(event.id, loggedInUser.id, numberOfGuests)}
      >
        {numberOfGuests}
      </button>
    </li>
  );
}

function getGuestsCount(guestsCount) {
  return guestsCount > 0 ? "#69a765" : "#707373";
}

export default AttendeeDecision;
