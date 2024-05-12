import { useContext } from "react";
import { EventContext } from "./EventContext.js";
import { UserContext } from "./UserContext.js";

function MessageList() {
  const { event } = useContext(EventContext);
  const { userList } = useContext(UserContext);

  const userMap = {};
  userList.forEach((user) => {
    userMap[user.id] = user;
  });

  event.messageList.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    else return 0;
  });

  return (
    <div>
      {event.messageList.map((message) => {
        return (
          <div>
            {message.date} {message.text} ({userMap?.[message.userId]?.name})
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
