import axios from 'axios';

export const fetchPetData = async (id) => {
  try {
    return await axios.get(
      `http://localhost:8083/api/pets/pet/${id}`,
    );
  } catch (error) {
    console.error('Error fetching pet:', error);
  }
};
