import Icon from "@mdi/react";
import {
  mdiEmoticonHappyOutline,
  mdiEmoticonSadOutline,
  mdiEmoticonNeutralOutline,
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
    loggedInUserAttendance = "hraju";
    iconPath = mdiEmoticonHappyOutline;
    color = "#69a765";
  } else if (loggedInUser && event.willNotAttend.includes(loggedInUser?.id)) {
    loggedInUserAttendance = "nehraju";
    iconPath = mdiEmoticonSadOutline;
    color = "#ff2216";
  } else {
    loggedInUserAttendance = "nevím";
    iconPath = mdiEmoticonNeutralOutline;
    color = "#ffb447";
  }

  return loggedInUser ? (
    <div class="dropdown">
      <button
        class="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={componentStyle(color)}
      >
        <Icon path={iconPath} size={0.8} color={color} />
        {loggedInUserAttendance}
      </button>
      <ul class="dropdown-menu">
        {decisionButton({
          callFunction: handlerMap.setWillAttend,
          event,
          loggedInUser,
          color: "#69a765",
          text: "hraju",
        })}
        {decisionButton({
          callFunction: handlerMap.setWillNotAttend,
          event,
          loggedInUser,
          color: "#ff2216",
          text: "nehraju",
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
        class="dropdown-item"
        style={{ color }}
        onClick={() => callFunction(event.id, loggedInUser.id)}
      >
        {text}
      </button>
    </li>
  );
}

export default AttendeeDecision;
