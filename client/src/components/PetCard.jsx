import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PetCard = ({ pet, handleDeletePet }) => (
  <div className="col-md-4" key={pet.id}>
    <div className="card">
      <img
        src={pet.profile_picture}
        className="card-img-top"
        alt={pet.name}
      />
      <div className="card-body">
        <h4 className="card-title">{pet.name}</h4>

        <Link to={`/pets/${pet.id}`} className="btn btn-info">
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
);

export default PetCard;
