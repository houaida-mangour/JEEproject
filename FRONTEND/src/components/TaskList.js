import React from "react";
import { Link } from "react-router-dom";
import TasksCard from "./TasksCard";
import "./TaskList.css";

const TaskList = (props) => {
  const deleteTaskHandler = (id) => {
    props.getTaskId(id);
  };

  

  const renderTaskList = props.tasks.map((task) => (
    <TasksCard
      key={task.id}
      task={task}
      clickHandler={deleteTaskHandler}
    />
  ));

  return (
    <div className="main">
      <h2>
        Task List
        <Link to="/add">
          <button className="ui button blue right">Add Task</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderTaskList}</div>
    </div>
  );
};

export default TaskList;
