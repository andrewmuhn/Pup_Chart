import axios from 'axios';

export const postNewUserSession = async (params) => {
  try {
    return await axios.post(
      'http://localhost:8083/api/users/sessions',
      params,
    );
  } catch (error) {
    console.error(error);
  }
};

export const postNewUser = async (params) => {
  try {
    return await axios.post(
      'http://localhost:8083/api/users',
      params,
    );
  } catch (error) {
    console.error(error);
  }
};
