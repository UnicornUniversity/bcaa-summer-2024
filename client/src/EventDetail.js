import WillAttendBadge from "./WillAttendBadge";
import AttendeeDecision from "./AttendeeDecision";

function EventDetail({ event }) {
  return (
    <div style={{ display: "grid", rowGap: "4px" }}>
      <div style={{ fontSize: "22px" }}>{event.name}</div>
      <div className="row" style={{ margin: "0" }}>
        <div className="col-12 col-sm-6" style={{ padding: "0" }}>
          <WillAttendBadge
            count={event.willAttend.length + event.guests.length}
          />
        </div>
        <div className="col-12 col-md-6" style={decisionColumnStyle()}>
          <AttendeeDecision event={event} />
        </div>
      </div>
    </div>
  );
}

function decisionColumnStyle() {
  return { display: "flex", justifyContent: "right", padding: "0" };
}

export default EventDetail;
