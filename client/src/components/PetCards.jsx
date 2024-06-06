import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PetCards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Dog 1"
            />
            <div className="card-body">
              <h5 className="card-title">Dog 1</h5>
              <p className="card-text">
                This is a description of Dog 1.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Dog 2"
            />
            <div className="card-body">
              <h5 className="card-title">Dog 2</h5>
              <p className="card-text">
                This is a description of Dog 2.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Dog 3"
            />
            <div className="card-body">
              <h5 className="card-title">Dog 3</h5>
              <p className="card-text">
                This is a description of Dog 3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCards;
