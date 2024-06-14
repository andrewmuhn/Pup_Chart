import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchShoppingListByUser } from '../utils/api/petCalls';

function ViewShoppingListModal({ show, handleClose }) {
  const [shoppingList, setShoppingList] = useState([]);

  const user = localStorage.getItem('user');

  const renderList = () => {
    return shoppingList.map((item, index) => (
      <Form.Check
        type="checkbox"
        id={`default-checkbox-${index}`}
        label={item.food}
        key={index}
      />
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      const shoppingResponse = await fetchShoppingListByUser(user);
      setShoppingList(shoppingResponse.data);
    };

    fetchData();
  }, [user]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{renderList()}</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewShoppingListModal;
