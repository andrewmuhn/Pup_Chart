const calculateAge = (birthdate) => {
  const today = new Date();
  const dob = new Date(birthdate);
  const age = today.getFullYear() - dob.getFullYear();

  if (age < 1) {
    return '<1';
  }

  return age;
};

module.exports = calculateAge;
