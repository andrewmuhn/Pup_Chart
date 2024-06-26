import { useState, useEffect } from 'react';
import PetCards from './PetCards';
import AddPetModal from './AddPetModal';
import ViewShoppingListModal from './ViewShoppingListModal'
import { fetchShoppingListByUser } from '../utils/api/petCalls';

export function HomePage() {
  const [showAddPet, setShowAddPet] = useState(false);
  const [showViewShopping, setShowViewShopping] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const user = localStorage.getItem('user');

  const handleAddPetClose = () => setShowAddPet(false);
  const handleAddPetShow = () => setShowAddPet(true);
  const handleViewShoppingClose = () => setShowViewShopping(false);
  const handleViewShoppingShow = () => setShowViewShopping(true);
  const jwt = localStorage.getItem('jwt');

  const renderShoppingButton = () => {
   return shoppingList.length > 0 ? ( <button
    className="btn btn-primary add-pet"
    onClick={handleViewShoppingShow}
  >
    View Shopping List
  </button>) : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      const shoppingResponse = await fetchShoppingListByUser(user);
      setShoppingList(shoppingResponse.data);
    }

    fetchData()
  }, [user]);

  return (
    <>
      {jwt ? (
        <>
          <PetCards />
          <div className="row mt-4">
            <div className="col text-center">
              {renderShoppingButton()}
              <br></br>
              <br></br>
              <button
                className="btn btn-primary add-pet"
                onClick={handleAddPetShow}
              >
                Add Pet
              </button>
            </div>
            <ViewShoppingListModal show={showViewShopping} handleClose={handleViewShoppingClose} shoppingList={shoppingList}/>
            <AddPetModal show={showAddPet} handleClose={handleAddPetClose} />
          </div>
        </>
      ) : (
        <>
          <div>
            <h1 className="h1-white">Welcome!</h1>
            <p>
              <img
                src="/images/logo-slogan.png"
                alt="logo"
                className="company-logo"
              />
            </p>
          </div>
          <h2
            style={{
              color: 'white',
            }}
          >
            <a className="home-link" href="/signup">
              Create an account
            </a>{' '}
            and join our pack of proud pet parents!
            <br /> Already a member?{' '}
            <a className="home-link" href="/login">
              Log in
            </a>{' '}
            to view your pets.
          </h2>
        </>
      )}
    </>
  );
}
