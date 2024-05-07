import React, { useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import axios from "axios";

const ItemCard = ({ item, clickHandler, updateHandler }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedItemData, setUpdatedItemData] = useState({
    itemName: item.itemName,
    description: item.description,
    price: item.price,
    category: item.category,
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/items/${item.id}`);
      clickHandler(item.id); // Trigger parent handler
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleUpdate = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/items/${item.id}`, updatedItemData);
      updateHandler(item.id, updatedItemData); // Trigger parent handler
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItemData({ ...updatedItemData, [name]: value });
  };

  return (
    <div className="item">
      <div className="right floated content">
        <button className="ui button red" onClick={handleDelete}>
          Delete
        </button>
        <button className="ui button primary" onClick={handleUpdate}>
          Update
        </button>
      </div>
      <div className="content">
        <div className="header">{item.itemName}</div>
        <div className="description">Description: {item.description}</div>
        <div className="meta">Price: {item.price}</div>
        <div className="meta">Category: {item.category}</div>
      </div>

      {/* Modal for updating item */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Update item</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>item Name</label>
              <input
                type="text"
                name="itemName"
                value={updatedItemData.itemName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={updatedItemData.description}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={updatedItemData.price}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={updatedItemData.category}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleSave}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ItemCard;
