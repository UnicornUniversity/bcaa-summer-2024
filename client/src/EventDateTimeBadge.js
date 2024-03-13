function EventDateTimeBadge({ event }) {
  const dateToShow = new Date(event.date);

  return (
    <div className={"rounded"} style={componentStyle()}>
      <div className={"rounded"} style={dateStyle()}>
        <div>{dateToShow.getDate().toString().padStart(2, "0")}</div>
        <div>{dateToShow.toLocaleString("cs-CZ", { month: "short" })}</div>
      </div>
      <div className={"rounded-bottom"} style={timeStyle()}>
        {dateToShow.toLocaleString("cs-CZ", { timeStyle: "short" })}
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    width: "88px",
    backgroundColor: "#d63232",
    display: "grid",
    height: "max-content",
  };
}

function dateStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    padding: "8px",
    fontSize: "22px",
    color: "white",
    lineHeight: 1,
  };
}

function timeStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    lineHeight: 1,
    padding: "4px",
    background: "#187bcd",
    color: "white",
  };
}

export default EventDateTimeBadge;
