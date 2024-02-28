import { useEffect, useState } from "react";

function Employee(props) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (props.showTime) setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  return (
    <div>
      zaměstnanec {props.name} - {currentTime.toLocaleString()}
    </div>
  );
}

export default Employee;
