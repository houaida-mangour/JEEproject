import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const [state, setState] = useState({
    name: "",
  });

  const add = async (e) => {
    e.preventDefault();
    if (state.name.trim() === "") { // Vérifiez si le champ "Name" est vide ou contient uniquement des espaces
      alert("Name field is mandatory!"); // Affichez un message d'alerte approprié
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/v1/categories", state);
      console.log("Category added:", state);
      setState({ name: "" });
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="ui main">
      <h2>Add Category</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={state.name}
            onChange={handleInputChange}
          />
        </div>
        <button className="ui button blue" type="submit">
          Add
        </button>


      </form>
      <Link to="/" className="ui button">
          Back to Item List
        </Link>
    </div>
  );
};

export default AddCategory;
