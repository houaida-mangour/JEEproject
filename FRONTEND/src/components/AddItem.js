import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const AddItems = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    if (
      state.name.trim() === "" ||
      state.description.trim() === "" ||
      state.price.trim() === "" ||
      state.categoryId.trim() === ""
    ) {
      alert("All fields are mandatory!");
      return;
    }
    // Check if categoryId is valid
    const isValidCategoryId = categories.some((category) => category.id === state.categoryId);
    if (!isValidCategoryId) {
      alert("Invalid Category ID!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/v1/items", state);
      console.log("Item added:", state);
      setState({ name: "", description: "", price: "", categoryId: "" });
    } catch (error) {
      console.error("Failed to add item:", error);
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
      <h2>Add Item</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={state.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={state.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <select name="categoryId" value={state.categoryId} onChange={handleInputChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button className="ui button blue" type="submit">
          Add
        </button>
        <Link to="/" className="ui button">
          Back to Item List
        </Link>
      </form>
    </div>
  );
};

export default AddItems;