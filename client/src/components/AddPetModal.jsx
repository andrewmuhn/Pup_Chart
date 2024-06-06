import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function AddPetModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    breed: '',
    profile_picture: '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    const params = {
      user_id: 1, // Hardcoded user ID, replace with logic to get user ID from signed-in user
      name: formData.name,
      breed: formData.breed,
      birthdate: formData.birthdate,
      profile_picture: formData.profile_picture,
    };

    axios
      .post('http://localhost:8083/api/pets', params)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
        setFormData({
          name: '',
          birthdate: '',
          breed: '',
          profile_picture: '',
        });
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
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
        <Modal.Title>Add Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3" controlId="formPetName">
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter pet name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetBreed">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Enter pet breed"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetBirthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProfilePicture">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control
              type="text"
              name="profile_picture"
              value={formData.profile_picture}
              onChange={handleChange}
              placeholder="Enter profile picture URL"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Pet
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

export default AddPetModal;
