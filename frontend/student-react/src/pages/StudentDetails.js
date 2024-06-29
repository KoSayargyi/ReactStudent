import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const StudentDetailsModal = ({ showNextModal, handleClose, student }) => {
  if (!student) {
    return null; // Or handle the case where student is null/undefined
  }

  return (
    <Modal show={showNextModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <table className="table table-striped" id="studentTable">
            <thead>
              <tr>
                <th scope="col">Student ID</th>
                <th scope="col">Student Name</th>
                <th scope="col">Student Email</th>
                <th scope="col">Student Phone</th>
                <th scope="col">Student Education</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>STR00{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.education}</td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentDetailsModal;
