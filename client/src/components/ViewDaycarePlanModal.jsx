import { Modal, Button } from 'react-bootstrap';

export default function ViewDaycarePlanModal({
  show,
  handleClose,
  handleEdit,
  pet,
  daycarePlan,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Daycare Plan for {pet.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Food:</strong> {daycarePlan.food}
        </p>
        <p>
          <strong>Walks:</strong> {daycarePlan.walks}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => handleEdit(daycarePlan)}
        >
          Edit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
