import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LeaveCourseModal = ({
  showModal,
  handleClose,
  student,
  courses,
  success,
  error,
  deletedCourse,
}) => (
  <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title style={{ color: "black" }}>Leave Course out</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {success && (
        <p className="success-message" style={{ color: "green" }}>
          {success}
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
      <Form>
        <table className="table table-striped" id="studentTable">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>
                    <i
                      className="bi bi-trash text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => deletedCourse(course.id, student.id)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No courses found</td>
              </tr>
            )}
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

export default LeaveCourseModal;
