import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import PetContext from '../contexts/PetContext';

export default function ViewDaycarePlanModal({
  show,
  handleClose,
  handleEditDaycare,
  handleEditMedication,
  daycarePlan
}) {
  const { pet } = useContext(PetContext);
  const [hospitals, setHospitals] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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
      <Dropdown.Item key={index} onClick={() => handleEditMedication(med)}>

        <h5>{med.name}</h5>
        <div style={{ paddingLeft: '20px' }}>
            <p>Dose: {med.dose}</p>
            <p>Time of Day: {timeLabels[med.time_of_day]}</p>
            {med.with_food ? <p>With Food</p> : null}
        </div>
      </Dropdown.Item>
      );
  });

}

  const fetchNearbyHospitals = useCallback(async () => {
    const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22veterinary%22](around:8000,38.9219893,-77.2368027);out;`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const vetFacilities = data.elements.map(
        (element) => element.tags,
      );
      setHospitals(vetFacilities);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
    }
  }, []);
  useEffect(() => {
    if (isDataLoaded) {
      const generatePDF = async () => {
        const doc = new jsPDF();

        // Set font for the document
        doc.setFont('Helvetica');
        doc.addImage(
          `${process.env.PUBLIC_URL}/images/logo.png`,
          'PNG',
          10,
          10,
          50,
          50,
        );

        doc.setFontSize(16);
        doc.text(
          `Daycare Plan for ${pet.name || 'loading..'}`,
          10,
          70,
        );
        doc.setFontSize(12);
        console.log(
          daycarePlan.dog_friendly,
          daycarePlan.cat_friendly,
          'cat and dogs',
        );
        doc.text(`Food: ${daycarePlan.food}`, 10, 80);
        doc.text(`Walks: ${walksLabels[daycarePlan.walks]}`, 10, 90);
        // Include all areas of the daycare plan
        doc.text(
          `Meal Schedule: ${mealLabels[daycarePlan.meal_schedule]}`,
          10,
          100,
        );
        doc.text(
          `Cat Friendly: ${daycarePlan.cat_friendly ? 'Yes' : 'No'}`,
          10,
          110,
        );
        doc.text(
          `Dog Friendly: ${daycarePlan.dog_friendly ? 'Yes' : 'No'}`,
          10,
          120,
        );
        doc.text(
          `Kid Friendly: ${daycarePlan.kid_friendly ? 'Yes' : 'No'}`,
          10,
          130,
        );
        doc.text(`List of Nearby Pet Hospitals:`, 10, 150);

        hospitals.forEach((hospital, index) => {
          const name = hospital.name || 'Unnamed Veterinary Facility';
          let address = `${hospital['addr:housenumber'] || ''} ${
            hospital['addr:street'] || ''
          }, ${hospital['addr:city'] || ''}, ${
            hospital['addr:state'] || ''
          } ${hospital['addr:postcode'] || ''}`;
          if (address.trim() === ', ,') {
            address = 'Address not available';
          }
          doc.setFontSize(12);
          doc.text(`- ${name}`, 10, 160 + index * 15);
          doc.text(`     ${address}`, 10, 165 + index * 15);
        });

        // Save the PDF
        doc.save(`${pet.name}_daycare_plan.pdf`);
      };

      generatePDF();
    }
  }, [isDataLoaded, hospitals, mealLabels, walksLabels]);

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
            <Button variant="success" onClick={fetchNearbyHospitals}>
              Download PDF
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
