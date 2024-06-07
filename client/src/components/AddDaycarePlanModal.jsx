import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function AddDaycarePlanModal({ show, handleClose, pet }) {
  const [formData, setFormData] = useState({
    food: '',
    walks: ''
  });

  const  handleDaycarePost = (params) => {
    axios
    .post('http://localhost:8083/api/daycare', params)
    .then((response) => {
      console.log(response.data);
      window.location.reload();
      setFormData({
        food: '',
        walks: ''
      });
    })
    .catch((error) => {
      console.log(error.response.data.errors);
    });
  }

  const handleSave = (e) => {
    e.preventDefault();
    const params = {
      pet_id: pet.id,
      food: formData.food,
      walks: formData.walks
    };

    handleDaycarePost(params);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Daycare Plan for {pet.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3" controlId="formPetFood">
            <Form.Label>Pet Food</Form.Label>
            <Form.Control
              type="text"
              name="food"
              value={formData.food}
              onChange={handleChange}
              placeholder="Enter the food your pet eats"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetWalks">
            <Form.Label>Walks</Form.Label>
            <Form.Control
              type="text"
              name="walks"
              value={formData.walks}
              onChange={handleChange}
              placeholder="Enter the number of walks your pet takes"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Daycare Plan
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDaycarePlanModal;