import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddPetModal({ show, handleClose, handleSave }) {
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    birthdate: '',
    breed: '',
    profile_picture: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSave = () => {
    handleSave(formData);
    setFormData({
      user_id: '',
      name: '',
      birthdate: '',
      breed: '',
      profile_picture: '',
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUserId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              placeholder="Enter user ID"
            />
          </Form.Group>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPetModal;
