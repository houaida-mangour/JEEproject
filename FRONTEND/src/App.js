import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import Header from "./components/Header";
import AddItems from "./components/AddItem";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="ui container">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/add" element={<AddItems />} />
          <Route path="/" element={<ItemList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
