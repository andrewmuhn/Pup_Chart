import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDaycarePlan, editDaycarePlan } from '../utils/api/daycareCalls';
import { Modal, Button, Form } from 'react-bootstrap';
import PetContext from '../contexts/PetContext';

function AddDaycarePlanModal({ show, handleClose, daycarePlan }) {
  const { pet } = useContext(PetContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    food: daycarePlan ? daycarePlan.food : '',
    walks: daycarePlan ? daycarePlan.walks : ''
  });

const handleDaycarePost = async (params) => {
  try {
    await postDaycarePlan(params);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

const handleDaycareEdit = async (params) => {
  try {
    const daycareId = daycarePlan.id;
    await editDaycarePlan(daycareId, params);
    navigate(window.location.pathname, { state: { openModal: true }, replace: true });
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
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

  const handleEdit = (e) => {
    e.preventDefault();
    const params = {
      pet_id: pet.id,
      food: formData.food,
      walks: formData.walks
    };

    handleDaycareEdit(params);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderButton = () => {
    return daycarePlan ? (
      <button className="btn btn-primary" onClick={handleEdit}>Edit Daycare Plan</button>
    ) : (
    <button className="btn btn-primary" onClick={handleSave}>
      Add Daycare Plan
    </button>
    );
  }

  useEffect(() => {
    if(daycarePlan) {
      setFormData({
        food: daycarePlan.food,
        walks: daycarePlan.walks,
      });
    } else {
      setFormData({
        food: '',
        walks: '',
      });
    }
  }, [daycarePlan]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Daycare Plan for {pet.name || 'loading..'}</Modal.Title>
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
          {renderButton()}
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