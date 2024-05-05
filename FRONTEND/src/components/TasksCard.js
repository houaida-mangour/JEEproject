import React from "react";
import user from "../images/user.png";

const TasksCard = (props) => {
  const { id, taskName, description, priority, status } = props.task;
  return (
    <div className="task-item">
      <div className="task-content">
        <img className="ui avatar image" src={user} alt="user" />
        <div className="header">{taskName}</div>
        <div>{description}</div>
        <div>{priority}</div>
        <div>{status}</div>
      </div>
      <div className="task-actions">
        <i
          className="trash alternate outline icon"
          style={{ color: "red" }}
          onClick={() => props.clickHandler(id)}
        ></i>
      </div>
    </div>
  );
};
export default TasksCard;
