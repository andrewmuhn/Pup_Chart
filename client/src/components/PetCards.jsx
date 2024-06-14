import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchPetsByUser, deletePet } from '../utils/api/petCalls';
import generatePDF from '../utils/generatePDF';

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
    generatePDF(pets); // Call the generatePDF function with the pets array
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {noPets && (
          <div className="col-md-12">
            <h2 style={{ color: 'white' }}>No pets found!</h2>
          </div>
        )}
        {jwt &&
          pets.map((pet) => (
            <div className="col-md-4" key={pet.id}>
              <div className="card">
                <img
                  src={pet.profile_picture}
                  className="card-img-top"
                  alt={pet.name}
                />
                <div className="card-body">
                  <h4 className="card-title">{pet.name}</h4>

                  <Link
                    to={`/pets/${pet.id}`}
                    className="btn btn-info"
                  >
                    View Details
                  </Link>
                  <Button
                    onClick={() => handleDeletePet(pet.id)}
                    className="btn btn-danger"
                  >
                    Remove Pet
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {jwt && (
        <div className="mt-3">
          <Button onClick={handleDownloadPDF} variant="primary">
            Download Sitter's Guide PDF
          </Button>
        </div>
      )}
    </div>
  );
}

export default PetCards;
