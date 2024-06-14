import axios from 'axios';

export const fetchDaycarePlanByPetId = async (petId) => {
  try {
    return await axios.get(
      `http://localhost:8083/api/daycare/${petId}`,
    );
  } catch (error) {
    console.error(error);
  }
};

export const postDaycarePlan = async (params) => {
  try {
    return await axios.post(
      'http://localhost:8083/api/daycare',
      params,
    );
  } catch (error) {
    console.error(error);
  }
};

export const editDaycarePlan = async (daycareId, params) => {
  try {
    return await axios.put(
      `http://localhost:8083/api/daycare/${daycareId}`,
      params,
    );
  } catch (error) {
    console.error(error);
  }
};

export const fetchDaycarePlanWithMedsByPetId = async (petId) => {
  try {
    return await axios.get(
      `http://localhost:8083/api/daycare/medications/${petId}`,
    );
  } catch (error) {
    console.error(error);
  }
};
