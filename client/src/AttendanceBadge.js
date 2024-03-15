function AttendanceBadge({ colorScheme, count }) {
  // get color based on colorScheme
  let color;
  if (colorScheme === "willAttend") {
    color = "#69a765";
  } else if (colorScheme === "willNotAttend") {
    color = "#ff2216";
  } else {
    color = "#ffb447";
  }

  return (
    <div className={"rounded"} style={componentStyle(color)}>
      účast <b>{count}</b>
    </div>
  );
}

function componentStyle(color) {
  return {
    backgroundColor: color,
    padding: "8px",
    width: "max-content",
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
    fontSize: "16px",
    lineHeight: 1,
    color: "white",
  };
}

export default AttendanceBadge;
