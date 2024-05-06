import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import axios from "axios";
import "./ItemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const deleteItemHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      // Update items after deletion
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const updateItemHandler = async (id, updatedItemData) => {
    try {
      await axios.put(`http://localhost:8080/items/${id}`, updatedItemData);
      // Update items after update
      fetchItems();
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const renderItemList = items.map((item) => (
    <ItemCard
      key={item.id}
      item={item}
      clickHandler={deleteItemHandler}
      updateHandler={updateItemHandler}
    />
  ));

  return (
    <div className="main">
      <h2>
        Item List
        <Link to="/add">
          <button className="ui button blue right">Add Item</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderItemList}</div>
    </div>
  );
};

export default ItemList;
