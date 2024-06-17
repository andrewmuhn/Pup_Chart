import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  postMedication,
  editMedication,
} from '../utils/api/medicationCalls';
import { Modal, Button, Form } from 'react-bootstrap';
import PetContext from '../contexts/PetContext';

function AddMedicationModal({ show, handleClose, medication }) {
  const { pet } = useContext(PetContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: medication ? medication.food : '',
    dose: medication ? medication.meal_schedule : '',
    time_of_day: medication ? medication.walks : '',
    with_food: medication ? medication.with_food : false,
  });

  const timeLabels = {
    morning: 'Morning',
    'mid-day': 'Mid-day',
    evening: 'Evening',
    'morning-evening': 'Morning and Evening',
  };

  const handleMedicationPost = async (params) => {
    try {
      await postMedication(params);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMedicationEdit = async (params) => {
    try {
      const medicationId = medication.id;
      await editMedication(medicationId, params);
      navigate(window.location.pathname, {
        state: { openModal: true },
        replace: true,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const params = {
      pet_id: pet.id,
      name: formData.name,
      dose: formData.dose,
      time_of_day: formData.time_of_day,
      with_food: formData.with_food,
    };
    handleMedicationPost(params);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const params = {
      pet_id: pet.id,
      name: formData.name,
      dose: formData.dose,
      time_of_day: formData.time_of_day,
      with_food: formData.with_food,
    };
    handleMedicationEdit(params);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // grab the checked status from checkbox
    });
  };

  const renderButton = () => {
    return medication && Object.keys(medication).length !== 0 ? (
      <button className="btn btn-primary" onClick={handleEdit}>
        Save Edit
      </button>
    ) : (
      <button className="btn btn-primary" onClick={handleSave}>
        Add Medication
      </button>
    );
  };

  useEffect(() => {
    if (medication && Object.keys(medication).length !== 0) {
      setFormData({
        name: medication.name,
        dose: medication.dose,
        time_of_day: medication.time_of_day,
        with_food: medication.with_food,
      });
    } else {
      setFormData({
        name: '',
        dose: '',
        time_of_day: '',
        with_food: false,
      });
    }
  }, [medication]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Medication for {pet.name || 'loading..'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3" controlId="formMedicationName">
            <Form.Label>Medication Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the name of the medication"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMedicationDose">
            <Form.Label>Medication Dose</Form.Label>
            <Form.Control
              type="text"
              name="dose"
              value={formData.dose}
              onChange={handleChange}
              placeholder="Enter the dose of the medication"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formMedicationTimeOfDay"
          >
            <Form.Label>Time Of Day</Form.Label>
            {Object.entries(timeLabels).map(([value, label]) => (
              <Form.Check
                key={value}
                type="radio"
                name="time_of_day"
                label={label}
                value={value}
                checked={formData.time_of_day === value}
                onChange={handleChange}
                className="mb-2"
              />
            ))}
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formMedicationWithFood"
          >
            <Form.Label>With Food?</Form.Label>
            <Form.Check
              type="checkbox"
              name="with_food"
              onChange={handleChange}
              checked={formData.with_food}
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

export default AddMedicationModal;
