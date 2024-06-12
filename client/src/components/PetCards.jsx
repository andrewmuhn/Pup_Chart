import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import calculateAge from '../utils/calculateAge';
import { Button } from 'react-bootstrap';
import { fetchPetsByUser, deletePet } from '../utils/api/petCalls';

function PetCards() {
  const [pets, setPets] = useState([]);
  const user = localStorage.getItem('user');
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    fetchPetsByUser(user)
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
      });
  }, [user]);

  const handleDeletePet = (petId) => {
    deletePet(petId);
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {jwt &&
          pets.map((pet) => (
            <div className="col-md-4" key={pet.id}>
              <div className="card">
                <img
                  src={'/images/' + pet.profile_picture}
                  className="card-img-top"
                  alt={pet.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p className="card-text">
                    Breed: {pet.breed}
                    <br />
                    Birthdate:{' '}
                    {new Date(pet.birthdate).toLocaleDateString()}
                    <br />
                    Age: {calculateAge(pet.birthdate)} years
                  </p>
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
    </div>
  );
}

export default PetCards;
