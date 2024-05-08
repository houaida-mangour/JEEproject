import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
//import Header from "./components/Header";
import AddItems from "./components/AddItem";
import ItemList from "./components/ItemList";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import AddCategory from "./components/AddCategory";

function App() {
  
  return (
    <div className="ui container">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/add" element={<AddItems />} />
          <Route path="/addcatg" element={<AddCategory />} />

          <Route path="/" element={<ItemList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
