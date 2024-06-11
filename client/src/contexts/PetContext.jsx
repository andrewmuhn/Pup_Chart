import { useState, createContext } from 'react';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pet, setPet] = useState({});

  return (
    <PetContext.Provider value={{ pet, setPet }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContext;