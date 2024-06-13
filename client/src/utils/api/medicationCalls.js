import axios from 'axios';

export const fetchMedicationByPetId = async (petId) => {
  try {
    return await axios.get(
      `http://localhost:8083/api/medication/${petId}`,
    );
  } catch (error) {
    console.error(error);
  }
};

export const postMedication = async (params) => {
  try {
    return await axios.post(
      'http://localhost:8083/api/medication',
      params,
    );
  } catch (error) {
    console.error(error);
  }
};

export const editMedication = async (medicationId, params) => {
  try {
    return await axios.put(
      `http://localhost:8083/api/medication/${medicationId}`,
      params,
    );
  } catch (error) {
    console.error(error);
  }
};
