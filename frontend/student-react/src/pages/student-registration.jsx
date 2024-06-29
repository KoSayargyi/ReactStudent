import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import UserCourseService from "../components/service/UserCourseService";
import CourseService from "../components/service/CourseService";
import "../index.css";

function StudentRegistration() {
  const [courseList, setCourseList] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isExistedCourse, setExistedCourse] = useState([]);
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCourses((prev) => [...prev, value]);
    } else {
      setSelectedCourses((prev) => prev.filter((id) => id !== value));
    }
  };

  const fetchExistedCourses = async () => {
    try {
      const res = await CourseService.getCoursesByUserId(token);
      setExistedCourse(res.map((course) => course.id.toString()));
    } catch (error) {
      alert(error.message || "Failed to fetch existing courses");
    }
  };

  const submitHandlerForCheckBox = async (e) => {
    e.preventDefault();
    try {
      const res = await UserCourseService.insertedUserCourse(
        selectedCourses,
        token
      );
      await fetchExistedCourses();
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      alert(error.message || "Failed to register courses");
    }
  };

  useEffect(() => {
    const fetchDataForCourse = async () => {
      try {
        const res = await CourseService.getAllCourses(token);
        setCourseList(res);
      } catch (error) {
        alert(error.message || "Failed to fetch courses");
      }
    };
    fetchDataForCourse();
    fetchExistedCourses();
  }, [token]);

  const renderCheckboxes = () => {
    const rows = [];
    for (let i = 0; i < courseList.length; i += 5) {
      rows.push(courseList.slice(i, i + 5));
    }
    return rows.map((row, rowIndex) => (
      <div className="row mb-2" key={rowIndex}>
        {row.map((course, colIndex) => {
          const isExistingCourse = isExistedCourse.includes(
            course.id.toString()
          );
          return (
            <div className="col-md-2" key={colIndex}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={`course${course.id}`}
                  id={`course${course.id}`}
                  value={course.id.toString()}
                  onChange={handleCheckboxChange}
                  checked={
                    isExistingCourse ||
                    selectedCourses.includes(course.id.toString())
                  }
                  disabled={isExistingCourse}
                />
                <label
                  style={{ color: isExistingCourse ? "gray" : "green" }}
                  className="form-check-label"
                  htmlFor={`course${course.id}`}
                >
                  {course.name}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <div className="main_contents">
        <div id="sub_content">
          <h1 style={{ color: "green" }}>
            Take a course and be a student in our community!
          </h1>
          {success && (
            <p className="success-message" style={{ color: "green" }}>
              {success}
            </p>
          )}
          <Form onSubmit={submitHandlerForCheckBox}>
            <fieldset className="row mb-4">
              <div className="col-md-2"></div>
              <legend className="col-form-label col-md-2 pt-0">Attend</legend>
              <div className="col-md-8">{renderCheckboxes()}</div>
            </fieldset>
            <div className="row mb-4">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Button type="submit" variant="primary">
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
