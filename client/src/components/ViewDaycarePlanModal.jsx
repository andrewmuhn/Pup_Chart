import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import PetContext from '../contexts/PetContext';

export default function ViewDaycarePlanModal({
  show,
  handleClose,
  handleEdit,
  daycarePlan,
}) {
  const { pet } = useContext(PetContext);
  const [hospitals, setHospitals] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
      console.log(vetFacilities, 'vets');
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
          20,
        );
        doc.setFontSize(12);
        doc.text(`Food: ${daycarePlan.food}`, 10, 30);
        doc.text(`Walks: ${daycarePlan.walks}`, 10, 40);
        doc.text(`List of nearby hospitals`, 10, 50);

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
          doc.text(`Name: ${name}`, 10, 60 + index * 20);
          doc.text(`Address: ${address}`, 10, 70 + index * 20);
        });

        // Save the PDF
        doc.save(`${pet.name}_daycare_plan.pdf`);
      };

      generatePDF();
    }
  }, [
    isDataLoaded,
    pet.name,
    daycarePlan.food,
    daycarePlan.walks,
    hospitals,
  ]);

  const mealLabels = {
    morning: 'Morning',
    'mid-day': 'Mid-day',
    evening: 'Evening',
    'breakfast-dinner': 'Breakfast & Dinner',
  };

  const walksLabels = {
    1: 'Every Hour',
    2: 'Every 2 Hours',
    4: 'Every 4 Hours',
    8: 'Every 8 Hours',
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
              {daycarePlan.walks || 'loading..'}
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => handleEdit(daycarePlan)}
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
