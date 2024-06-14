import jsPDF from 'jspdf';
import { fetchDaycarePlanWithMedsByPetId } from './api/daycareCalls';
import fetchNearbyHospitals from './fetchNearbyHospitals';
import { mealLabels, walksLabels } from './daycareLabels';

const generatePDF = async (petsArray) => {
  const doc = new jsPDF();

  const petsArrayLength = petsArray.length || 1;

  const nearbyHospitals = await fetchNearbyHospitals();

  // Add logo at the top of the page
  doc.setFont('Helvetica');
  doc.addImage(
    `${process.env.PUBLIC_URL}/images/logo.png`,
    'PNG',
    10,
    10,
    50,
    50,
  );

  for (let index = 0; index < petsArrayLength; index++) {
    const pet = petsArray[index] || petsArray;
    const daycarePlanResponse = await fetchDaycarePlanWithMedsByPetId(
      pet.id,
    );
    const daycarePlan = daycarePlanResponse.data[0];

    doc.setFontSize(16);
    if (daycarePlan) {
      doc.text(
        `Daycare Plan for ${pet.name || 'loading..'}`,
        10,
        70 + index * 100,
      );
      doc.setFontSize(12);
      doc.text(`Food: ${daycarePlan.food}`, 10, 80 + index * 100);
      doc.text(
        `Walks: ${walksLabels[daycarePlan.walks]}`,
        10,
        90 + index * 100,
      );
      // Include all areas of the daycare plan
      doc.text(
        `Meal Schedule: ${mealLabels[daycarePlan.meal_schedule]}`,
        10,
        100 + index * 100,
      );
      doc.text(
        `Cat Friendly: ${daycarePlan.cat_friendly ? 'Yes' : 'No'}`,
        10,
        110 + index * 100,
      );
      doc.text(
        `Dog Friendly: ${daycarePlan.dog_friendly ? 'Yes' : 'No'}`,
        10,
        120 + index * 100,
      );
      doc.text(
        `Kid Friendly: ${daycarePlan.kid_friendly ? 'Yes' : 'No'}`,
        10,
        130 + index * 100,
      );

      // Check if medications exist before displaying
      if (daycarePlan.medications[0].id !== null) {
        doc.text(`Medications:`, 10, 140 + index * 100);
        daycarePlan.medications.forEach((med, medIndex) => {
          const foodText = med.with_food
            ? 'with food'
            : 'without food';
          doc.text(
            `-  ${med.dose} ${med.name} given at ${med.time_of_day} ${foodText}`,
            15,
            145 + index * 100 + medIndex * 10,
          );
        });
      }
    }
  }

  doc.addPage();
  // Add hospitals list after all pets
  doc.setFontSize(16);
  doc.text(`List of Nearby Pet Hospitals:`, 10, 40);
  doc.setFontSize(12);
  nearbyHospitals.forEach((hospital, hospitalIndex) => {
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
    doc.text(`- ${name}`, 10, 50 + hospitalIndex * 10);
    doc.text(`     ${address}`, 10, 55 + hospitalIndex * 10);
  });

  // Save the PDF
  doc.save(`daycare_plans.pdf`);
};

export default generatePDF;
