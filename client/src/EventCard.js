import Icon from "@mdi/react";
import {
  mdiAccountCheckOutline,
  mdiAccountAlertOutline,
  mdiAccountQuestionOutline,
} from "@mdi/js";

function EventCard({ event, userList }) {
  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{`${event.date} (${event.name})`}</h5>
        <div class="card-text">
          <Icon path={mdiAccountCheckOutline} size={1} color={"green"} />
          {event.willAttend.length} /
          <Icon path={mdiAccountAlertOutline} size={1} color={"red"} />
          {event.willNotAttend.length} /
          <Icon path={mdiAccountQuestionOutline} size={1} color={"orange"} />
          {userList.length -
            event.willAttend.length -
            event.willNotAttend.length}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
