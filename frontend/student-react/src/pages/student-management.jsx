import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import UserService from "../components/service/UserService";
import CourseService from "../components/service/CourseService";
import UserCourseService from "../components/service/UserCourseService";
import LeaveCourseModal from "./LeaveCourseOut";
import StudentDetailsModal from "./StudentDetails";
import "../index.css";

function StudentManagement() {
  const [studentList, setStudentList] = useState([]);
  const [courseMap, setCourseMap] = useState({});
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showLeaveCourseModal, setShowLeaveCourseModal] = useState(false);
  const [showStudentDetailsModal, setShowStudentDetailsModal] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const token = localStorage.getItem("token");
  const isAdmin = UserService.isAdmin();

  const fetchCourseData = async () => {
    try {
      const res = await CourseService.getCoursesByUserId(token);
      console.log("Course response:", res);
      setCourseMap(res);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error.message || "Failed to fetch courses");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const fetchCourseDataForLoginStudent = async () => {
    try {
      const res = await CourseService.gtCoursesForLoginStuden(token);
      console.log("Course response:", res);
      setCourseMap(res);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error.message || "Failed to fetch courses");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const fetchStudentRes = async () => {
    try {
      const res = await UserService.getStudent(token);
      setStudentList(res.userList);
      setFilteredStudentList(res.userList);
    } catch (error) {
      console.error("Error fetching student:", error);
      setError(error.message || "Failed to fetch student");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const res = await UserService.getAllActiveStudents(token);
        console.log("Student response:", res);
        setStudentList(res.userList);
        setFilteredStudentList(res.userList);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message || "Failed to fetch students");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    if (isAdmin) {
      fetchStudentsData();
      fetchCourseData();
    }
    if (!isAdmin) {
      fetchStudentRes();
      fetchCourseDataForLoginStudent();
    }
  }, []);

  const handleLeaveCourseModalClose = () => {
    setShowLeaveCourseModal(false);
    setSelectedStudent(null);
    setSelectedCourses([]);
  };

  const handleStudentDetailsModalClose = () => {
    setShowStudentDetailsModal(false);
    setSelectedStudent(null);
    setSelectedCourses([]);
  };

  const deletedCourse = async (id, studentId) => {
    console.log(":::::::", id, studentId);
    try {
      const res = await UserCourseService.deletedUserCourse(
        id,
        studentId,
        token
      );
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      if (isAdmin) {
        await fetchCourseData();
      } else {
        await fetchCourseDataForLoginStudent();
      }
      setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
    } catch (error) {
      setError(error.message || "Failed to delete course");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleShowStudentDetailsModal = (studentId) => {
    const selected = studentList.find((student) => student.id === studentId);
    if (selected) {
      setSelectedStudent(selected);
      setShowStudentDetailsModal(true);
    }
  };

  const handleShowLeaveCourseModal = (studentId) => {
    const selected = studentList.find((student) => student.id === studentId);
    if (selected) {
      setSelectedStudent(selected);
      setSelectedCourses(courseMap[selected.id] || []);
      setShowLeaveCourseModal(true);
    }
  };

  const handleSearch = () => {
    let filteredList = studentList;

    if (searchId.trim() !== "") {
      filteredList = filteredList.filter((student) =>
        student.id.toString().includes(searchId.trim())
      );
    }

    if (searchName.trim() !== "") {
      filteredList = filteredList.filter((student) =>
        student.name.toLowerCase().includes(searchName.trim().toLowerCase())
      );
    }

    if (searchCourse.trim() !== "") {
      filteredList = filteredList.filter((student) =>
        courseMap[student.id]?.some((course) =>
          course.name.toLowerCase().includes(searchCourse.trim().toLowerCase())
        )
      );
    }

    setFilteredStudentList(filteredList);
  };

  const handleReset = () => {
    setSearchId("");
    setSearchName("");
    setSearchCourse("");
    setFilteredStudentList(studentList);
  };

  return (
    <div>
      <div className="main_contents">
        <div id="sub_content">
          {isAdmin && (
            <Form
              className="row g-3 mt-3 ms-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="col-auto">
                <label htmlFor="studentId" className="visually-hidden">
                  Student ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentId"
                  placeholder="Student ID"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <label htmlFor="studentName" className="visually-hidden">
                  Student Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentName"
                  placeholder="Student Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <label htmlFor="courseName" className="visually-hidden">
                  Course
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="courseName"
                  placeholder="Course Name"
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <Button
                  type="button"
                  className="btn btn-success mb-3"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              <div className="col-auto">
                <Button
                  type="button"
                  className="btn btn-secondary mb-3"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </Form>
          )}
          <div>
            <table className="table table-striped" id="studentTable">
              <thead>
                <tr>
                  <th scope="col">Student ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Details</th>
                  <th scope="col">Cancel course</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudentList.map((student) => (
                  <tr key={student.id}>
                    <td>STR{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                      <ul>
                        {courseMap[student.id] &&
                        courseMap[student.id].length > 0 ? (
                          courseMap[student.id].map((course) => (
                            <li key={course.id}>{course.name}</li>
                          ))
                        ) : (
                          <li>No courses found</li>
                        )}
                      </ul>
                    </td>
                    <td>
                      <Button
                        type="button"
                        className="btn btn-secondary mb-2"
                        onClick={() =>
                          handleShowStudentDetailsModal(student.id)
                        }
                      >
                        See More
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="button"
                        className="btn btn-secondary mb-2"
                        onClick={() => handleShowLeaveCourseModal(student.id)}
                      >
                        Cancel course
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <LeaveCourseModal
        showModal={showLeaveCourseModal}
        handleClose={handleLeaveCourseModalClose}
        student={selectedStudent}
        courses={selectedCourses}
        success={success}
        error={error}
        deletedCourse={deletedCourse}
      />

      <StudentDetailsModal
        showNextModal={showStudentDetailsModal}
        handleClose={handleStudentDetailsModalClose}
        student={selectedStudent}
      />
    </div>
  );
}

export default StudentManagement;
