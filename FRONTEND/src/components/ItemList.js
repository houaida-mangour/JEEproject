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
      const response = await axios.get("http://localhost:8080/api/v1/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const updateItemHandler = async (id, updatedItemData) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/items/${id}`, updatedItemData);
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
      updateHandler={updateItemHandler}
      fetchItems={fetchItems} // Pass fetchItems to ItemCard
    />
  ));
  

  return (
    <div className="main">
      <h2>
        Item List
        <Link to="/add">
          <button className="ui button blue right">Add Item</button>
        </Link>
        <Link to="/addcatg">
          <button className="ui button blue right">Add Category</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderItemList}</div>
    </div>
  );
};

export default ItemList;
