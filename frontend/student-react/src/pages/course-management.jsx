import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import CourseService from "../components/service/CourseService";
import "../index.css";

function CourseManagement() {
  const [courseList, setCourseList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    name: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const res = await CourseService.getAllCourses(token);
        setCourseList(res);
      } catch (error) {
        setError(error.message || "Failed to fetch courses");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchCoursesData();
  }, [token]);

  const handleDeleteForCourse = async (id) => {
    try {
      const res = await CourseService.deletedCourse(id, token);
      setSuccess(res.message);
      setCourseList(courseList.filter((course) => course.id !== id));
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError(error.message || "Failed to delete course");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleUpdateForCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await CourseService.updateCourse(
        selectedCourse.id,
        selectedCourse,
        token
      );
      setCourseList(
        courseList.map((course) =>
          course.id === selectedCourse.id ? selectedCourse : course
        )
      );
      setSuccess(res.message);
      setShowModal(false);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError(error.message || "Failed to update course");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className="main_contents">
        <div id="sub_content">
          <h2 style={{ textAlign: "center" }}>Course Management</h2>
          {success && (
            <p className="success-message" style={{ color: "green" }}>
              {success}
            </p>
          )}
          {error && <p className="error-message">{error}</p>}
          <table className="table table-striped" id="courseTable">
            <thead>
              <tr>
                <th scope="col">Course ID</th>
                <th scope="col">Course Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>
                    <Button
                      type="button"
                      variant="success"
                      onClick={() => handleUpdateForCourse(course)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDeleteForCourse(course.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Update Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCourseID">
              <Form.Label style={{ color: "black" }}>Course ID : </Form.Label>
              <Form.Control type="text" readOnly value={selectedCourse.id} />
            </Form.Group>
            <Form.Group controlId="formCourseName">
              <Form.Label style={{ color: "black" }}>Course Name : </Form.Label>
              <Form.Control
                type="text"
                value={selectedCourse.name}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CourseManagement;
