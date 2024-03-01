import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiVolleyball } from "@mdi/js";

function Employee(props) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (props.showTime) setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  return (
    <div className="card">
      <Icon
        path={mdiVolleyball}
        title="User Profile"
        size={1}
        horizontal
        vertical
        rotate={90}
        color="blue"
      />
      zaměstnanec {props.name} - {currentTime.toLocaleString()}
    </div>
  );
}

export default Employee;
