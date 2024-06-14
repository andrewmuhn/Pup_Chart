import React, { useContext } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';

import PetContext from '../contexts/PetContext';
import generatePDF from '../utils/generatePDF';

export default function ViewDaycarePlanModal({
  show,
  handleClose,
  handleEditDaycare,
  handleEditMedication,
  daycarePlan,
}) {
  const { pet } = useContext(PetContext);

  const mealLabels = {
    morning: 'Morning',
    'mid-day': 'Mid-day',
    evening: 'Evening',
    'breakfast-dinner': 'Breakfast & Dinner',
  };
  const timeLabels = {
    morning: 'Mornings',
    'mid-day': 'Mid-day',
    evening: 'Evenings',
    'morning-evening': 'Mornings & Evenings',
  };

  const walksLabels = {
    1: 'Every Hour',
    2: 'Every 2 Hours',
    4: 'Every 4 Hours',
    8: 'Every 8 Hours',
  };

  const renderDropdownList = (medications) => {
    if (!medications) {
      return null;
    }
    return medications.map((med, index) => {
      return (
        <Dropdown.Item
          key={index}
          onClick={() => handleEditMedication(med)}
        >
          <h5>{med.name}</h5>
          <div style={{ paddingLeft: '20px' }}>
            <p>Dose: {med.dose}</p>
            <p>Time of Day: {timeLabels[med.time_of_day]}</p>
            {med.with_food ? <p>With Food</p> : null}
          </div>
        </Dropdown.Item>
      );
    });
  };

  return (
    <>
      {daycarePlan && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Daycare Plan for {pet.name || 'loading..'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Food:</strong> {daycarePlan.food || 'loading..'}
            </p>
            <p>
              <strong>Meal Schedule:</strong>{' '}
              {mealLabels[daycarePlan.meal_schedule] || 'loading..'}
            </p>
            <p>
              <strong>Walks:</strong>{' '}
              {walksLabels[daycarePlan.walks] || 'loading..'}
            </p>
            <p>
              <strong>Cat Friendly:</strong>{' '}
              {daycarePlan.cat_friendly ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Dog Friendly:</strong>{' '}
              {daycarePlan.dog_friendly ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Kid Friendly:</strong>{' '}
              {daycarePlan.kid_friendly ? 'Yes' : 'No'}
            </p>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                View Medications
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {renderDropdownList(daycarePlan.medications)}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => handleEditDaycare(daycarePlan)}
            >
              Edit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => generatePDF(pet)}
            >
              Download PDF
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
