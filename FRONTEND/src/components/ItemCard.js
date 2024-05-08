// Importer les dépendances nécessaires
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import axios from "axios";

const ItemCard = ({ item, updateHandler }) => {
  // État local pour gérer l'affichage du modal et les données mises à jour de l'élément
  const [showModal, setShowModal] = useState(false);
  const [updatedItemData, setUpdatedItemData] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    categoryId: item.categoryId,
  });
  
  // État local pour stocker la liste des catégories
  const [categories, setCategories] = useState([]);

  // Effet pour charger les catégories au montage du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction pour récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fonction utilitaire pour obtenir le nom de la catégorie à partir de son ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : '';
  };

  // Gestionnaire de suppression d'élément
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/items/${item.id}`);
      // Mettre à jour l'affichage après la suppression en appelant la fonction de mise à jour
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Gestionnaire d'ouverture du modal de mise à jour
  const handleUpdate = () => {
    setShowModal(true);
  };

  // Gestionnaire de sauvegarde des modifications
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/items/${item.id}`, updatedItemData);
      // Déclencher le gestionnaire de mise à jour parent
      updateHandler(item.id, updatedItemData);
      setShowModal(false); // Fermer le modal après la sauvegarde
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  // Gestionnaire de changement de champ de formulaire
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
        <div className="header">{item.name}</div>
        <div className="description">Description: {item.description}</div>
        <div className="meta">Price: {item.price}</div>
        <div className="meta">Category: {getCategoryName(item.categoryId)}</div>
      </div>

      {/* Modal pour la mise à jour de l'élément */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Update item</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Item Name</label>
              <input
                type="text"
                name="name"
                value={updatedItemData.name}
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
              <select
                name="categoryId"
                value={updatedItemData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
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
