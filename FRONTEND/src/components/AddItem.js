import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddItems = (props) => {
  const [state, setState] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
  });

  const add = (e) => {
    e.preventDefault();
    if (
      state.itemName === "" ||
      state.description === "" ||
      state.price === "" ||
      state.category === ""
    ) {
      alert("All fields are mandatory!");
      return;
    }
    props.addItemsHandler(state);
    setState({ itemName: "", description: "", price: "", category: "" });
    // Optionally, navigate using Link component
    // No need to manually push to history
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
          <label>Item</label>
          <input
            type="text"
            name="itemName"
            placeholder="ItemName"
            value={state.itemName}
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
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={state.category}
            onChange={handleInputChange}
          />
        </div>
        <button className="ui button blue" type="submit">
          Add
        </button>
        {/* Use Link to navigate back to ItemList */}
        <Link to="/" className="ui button">
          Back to Item List
        </Link>
      </form>
    </div>
  );
};

export default AddItems;
