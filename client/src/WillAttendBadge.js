function WillAttendBadge({ count }) {
  // if there is less then 6 people attending, the color is red
  // if there is less then 8 people attending, the color is orange
  // otherwise the color is green
  let color;
  if (count < 6) color = "#ff2216";
  else if (count < 10) color = "#ffb447";
  else color = "#69a765";

  return (
    <div className={"rounded"} style={componentStyle(color)}>
      účast <b>{count}</b>
    </div>
  );
}

function componentStyle(color) {
  return {
    color: color,
    padding: "8px 0",
    width: "max-content",
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
    fontSize: "18px",
    lineHeight: 1,
  };
}

export default WillAttendBadge;
