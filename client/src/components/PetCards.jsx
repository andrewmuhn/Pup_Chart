import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { fetchPetsByUser, deletePet } from '../utils/api/petCalls';
import generatePDF from '../utils/generatePDF';
import PetCard from './PetCard';

function PetCards() {
  const [pets, setPets] = useState([]);
  const [noPets, setNoPets] = useState(false);

  const user = localStorage.getItem('user');
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    fetchPetsByUser(user)
      .then((response) => {
        console.log(user, response, 'response');
        setPets(response.data);
        if (response.data.length === 0) {
          setNoPets(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
      });
  }, [user]);

  const handleDeletePet = (petId) => {
    deletePet(petId);
    window.location.reload();
  };

  const handleDownloadPDF = () => {
    generatePDF(pets);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          {noPets && (
            <div className="col-md-12">
              <h2 style={{ color: 'white' }}>No pets found!</h2>
            </div>
          )}
          {jwt &&
            pets.map((pet) => (
              <PetCard
                pet={pet}
                key={pet.id}
                handleDeletePet={handleDeletePet}
              />
            ))}
        </div>
      </div>
      {jwt && (
        <div className="d-flex justify-content-center mt-5">
          <Button
            className="add-pet"
            onClick={handleDownloadPDF}
            variant="primary"
          >
            Download Sitter's Guide PDF
          </Button>
        </div>
      )}
    </div>
  );
}

export default PetCards;
