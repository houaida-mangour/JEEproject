import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AddTasks from "./components/AddTasks";
import TaskList from "./components/TaskList";
import LoginPage from "./pages/loginPage";
import Register from "./components/Register";
import uuid4 from "uuid4";

function App() {
  const LOCAL_STORAGE_KEY = "tasks";
  const [tasks, setTasks] = useState([]);

  const addTasksHandler = (task) => {
    console.log(task);
    setTasks([...tasks, { id: uuid4(), ...task }]);
  };

  const removeTaskHandler = (id) => {
    const newTaskList = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newTaskList);
  };
  useEffect(() => {
    const retriveTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveTasks) setTasks(retriveTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="ui container">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/add"
            element={<AddTasks addTasksHandler={addTasksHandler} />}
          />
          <Route
            path="/"
            element={<TaskList tasks={tasks} getTaskId={removeTaskHandler} />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        {/* <AddTasks addTasksHandler={addTasksHandler}/>
    <TaskList tasks={tasks} getTaskId={removeTaskHandler}/>  */}
      </Router>
    </div>
  );
}

export default App;
