import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { postNewPet, uploadPetImage } from '../utils/api/petCalls';
import dogBreeds from '../utils/dogBreeds';

function AddPetModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    breed: '',
    profile_picture: '',
  });

  const uploadFile = async (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);

    const petImageResponse = await uploadPetImage(data);
    // Update formData with the file name
    setFormData({
      ...formData,
      profile_picture: petImageResponse.data.fileName,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const params = {
      user_id: localStorage.getItem('user'),
      name: formData.name,
      breed: formData.breed,
      birthdate: formData.birthdate,
      profile_picture: formData.profile_picture || 'logo.png',
    };

    postNewPet(params);
    window.location.reload();
    setFormData({
      name: '',
      birthdate: '',
      breed: '',
      profile_picture: '',
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
              as="select"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select breed
              </option>
              {dogBreeds.map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))}
            </Form.Control>
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
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="profile_picture"
              onChange={uploadFile}
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
