import axios from 'axios';

export const fetchPetData = async (petId) => {
  try {
    return await axios.get(
      `http://localhost:8083/api/pets/pet/${petId}`,
    );
  } catch (error) {
    console.error('Error fetching pet:', error);
  }
};

export const fetchPetsByUser = async (userId) => {
  try {
    return await axios.get(
      `http://localhost:8083/api/pets/${userId}`,
    );
  } catch (error) {
    console.error(error);
  }
};

export const postNewPet = async (params) => {
  try {
    return await axios.post('http://localhost:8083/api/pets', params);
  } catch (error) {
    console.error(error);
  }
};

export const uploadPetImage = async (data) => {
  try {
    return await axios.post(
      'http://localhost:8083/api/pets/uploadFileAPI',
      data,
    );
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
