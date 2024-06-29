import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CourseService from "../components/service/CourseService";
import "../index.css";

function CourseRegistration() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");
  const submitHandlerForCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await CourseService.createdCourse(name, token);
      setSuccess(res.message);
      setName("");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div>
      <div className="main_contents">
        <div id="sub_content">
          <Form onSubmit={submitHandlerForCourse}>
            <h2 className="col-md-6 offset-md-2 mb-5 mt-4">
              Course Registration
            </h2>

            <div className="row mb-4">
              <div className="col-md-2"></div>
              <label htmlFor="name" className="col-md-2 col-form-label">
                Course Name
              </label>
              <div className="col-md-4">
                {success && (
                  <p className="success-message" style={{ color: "green" }}>
                    {success}
                  </p>
                )}
                {error && <p className="error-message">{error}</p>}
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4"></div>

              <div className="col-md-6">
                <Button type="submit" className="btn btn-secondary col-md-2">
                  Add
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
