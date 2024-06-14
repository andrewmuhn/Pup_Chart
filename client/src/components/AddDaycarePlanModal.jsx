import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  postDaycarePlan,
  editDaycarePlan,
} from '../utils/api/daycareCalls';
import { Modal, Button, Form } from 'react-bootstrap';
import PetContext from '../contexts/PetContext';
import { mealLabels, walksLabels } from '../utils/daycareLabels';

function AddDaycarePlanModal({ show, handleClose, daycarePlan }) {
  const { pet } = useContext(PetContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food: daycarePlan ? daycarePlan.food : '',
    meal_schedule: daycarePlan ? daycarePlan.meal_schedule : '',
    walks: daycarePlan ? daycarePlan.walks : '',
    cat_friendly: daycarePlan ? daycarePlan.cat_friendly : false,
    dog_friendly: daycarePlan ? daycarePlan.dog_friendly : false,
    kid_friendly: daycarePlan ? daycarePlan.kid_friendly : false,
  });

  const handleDaycarePost = async (params) => {
    try {
      await postDaycarePlan(params);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDaycareEdit = async (params) => {
    try {
      const daycareId = daycarePlan.daycare_id;
      await editDaycarePlan(daycareId, params);
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
      food: formData.food,
      meal_schedule: formData.meal_schedule,
      walks: formData.walks,
      cat_friendly: formData.cat_friendly,
      dog_friendly: formData.dog_friendly,
      kid_friendly: formData.kid_friendly,
    };
    handleDaycarePost(params);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const params = {
      pet_id: pet.id,
      food: formData.food,
      meal_schedule: formData.meal_schedule,
      walks: formData.walks,
      cat_friendly: formData.cat_friendly,
      dog_friendly: formData.dog_friendly,
      kid_friendly: formData.kid_friendly,
    };
    handleDaycareEdit(params);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // grab the checked status from checkbox
    });
  };

  const renderButton = () => {
    return daycarePlan ? (
      <button className="btn btn-primary" onClick={handleEdit}>
        Save Edit
      </button>
    ) : (
      <button className="btn btn-primary" onClick={handleSave}>
        Add Daycare Plan
      </button>
    );
  };

  useEffect(() => {
    if (daycarePlan) {
      setFormData({
        food: daycarePlan.food,
        meal_schedule: daycarePlan.meal_schedule,
        walks: daycarePlan.walks,
        cat_friendly: daycarePlan.cat_friendly,
        dog_friendly: daycarePlan.dog_friendly,
        kid_friendly: daycarePlan.kid_friendly,
      });
    } else {
      setFormData({
        food: '',
        meal_schedule: '',
        walks: '',
        cat_friendly: false,
        dog_friendly: false,
        kid_friendly: false,
      });
    }
  }, [daycarePlan]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Daycare Plan for {pet.name || 'loading..'}
        </Modal.Title>
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
          <Form.Group
            className="mb-3"
            controlId="formPetmeal_schedule"
          >
            <Form.Label>Meal Schedule</Form.Label>
            {Object.entries(mealLabels).map(([value, label]) => (
              <Form.Check
                key={value}
                type="radio"
                name="meal_schedule"
                label={label}
                value={value}
                checked={formData.meal_schedule === value}
                onChange={handleChange}
                className="mb-2"
              />
            ))}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetWalks">
            <Form.Label>Walks</Form.Label>
            {Object.entries(walksLabels).map(([value, label]) => (
              <Form.Check
                key={value}
                type="radio"
                name="walks"
                label={label}
                value={value}
                checked={formData.walks === value} // Use loose equality for comparison
                onChange={handleChange}
                className="mb-2"
              />
            ))}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetCatFriendly">
            <Form.Label>Cat Friendly?</Form.Label>
            <Form.Check
              type="checkbox"
              name="cat_friendly"
              onChange={handleChange}
              checked={formData.cat_friendly}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetDogFriendly">
            <Form.Label>Dog Friendly?</Form.Label>
            <Form.Check
              type="checkbox"
              name="dog_friendly"
              onChange={handleChange}
              checked={formData.dog_friendly}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPetKidFriendly">
            <Form.Label>Kid Friendly?</Form.Label>
            <Form.Check
              type="checkbox"
              name="kid_friendly"
              onChange={handleChange}
              checked={formData.kid_friendly}
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
