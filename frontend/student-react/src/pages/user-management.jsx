import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserService from "../components/service/UserService";
import "../index.css";

function UserManagement() {
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    role: "",
    phone: "",
  });
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const fetchUserData = async () => {
    try {
      const res = await UserService.getAllActiveUsers(token);
      setUserList(res.userList);
      setFilteredUserList(res.userList);
    } catch (error) {
      setError(error.message || "Failed to fetch users");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleDeleteForUser = async (id) => {
    try {
      const res = await UserService.deleteUser(id, token);
      setUserList(userList.filter((user) => user.id !== id));
      setFilteredUserList(filteredUserList.filter((user) => user.id !== id));
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError(error.message || "Failed to delete user");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleUpdateForUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaveChangesForUser = async () => {
    try {
      const res = await UserService.updateUser(
        selectedUser.id,
        selectedUser,
        token
      );
      setUserList(
        userList.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
      setFilteredUserList(
        filteredUserList.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
      setSuccess(res.message);
      setShowModal(false);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError(error.message || "Failed to update user");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let filteredList = userList;

    if (searchId.trim() !== "") {
      filteredList = filteredList.filter((user) =>
        user.id.toString().includes(searchId.trim())
      );
    }

    if (searchName.trim() !== "") {
      filteredList = filteredList.filter((user) =>
        user.name.toLowerCase().startsWith(searchName.trim().toLowerCase())
      );
    }

    setFilteredUserList(filteredList);
  };

  const handleReset = () => {
    setSearchId("");
    setSearchName("");
    setFilteredUserList(userList);
  };

  return (
    <div>
      <div className="main_contents">
        <div id="sub_content">
          <Form className="row g-3 mt-3 ms-2" onSubmit={handleSearch}>
            <div className="col-auto">
              <Form.Label htmlFor="userId" className="visually-hidden">
                User ID
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="userId"
                placeholder="User ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <Form.Label htmlFor="userName" className="visually-hidden">
                User Name
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="userName"
                placeholder="User Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <Button type="submit" className="btn btn-primary mb-3">
                Search
              </Button>
            </div>
            <div className="col-auto">
              <Link to="/app/user/create">
                <Button type="button" className="btn btn-secondary">
                  Add
                </Button>
              </Link>
            </div>
            <div className="col-auto">
              <Button
                type="button"
                className="btn btn-danger mb-3"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </Form>
          {success && (
            <p className="success-message" style={{ color: "green" }}>
              {success}
            </p>
          )}
          {error && <p className="error-message">{error}</p>}
          <table className="table table-striped" id="studentTable">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">User Name</th>
                <th scope="col">User Photo</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserList.map((user) => (
                <tr key={user.id}>
                  <td>USR00{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    {
                      <img
                        src={user.photo}
                        alt="user-photo"
                        width={100}
                        height={100}
                      />
                    }
                  </td>
                  <td>
                    <Button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleUpdateForUser(user)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDeleteForUser(user.id)}
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
          <Modal.Title style={{ color: "black" }}>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsereID">
              <Form.Label style={{ color: "black" }}>User ID : </Form.Label>
              <Form.Control type="text" readOnly value={selectedUser.id} />
            </Form.Group>
            <Form.Group controlId="formUserName">
              <Form.Label style={{ color: "black" }}>User Name : </Form.Label>
              <Form.Control
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: "black" }}>User Email : </Form.Label>
              <Form.Control
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: "black" }}>Password : </Form.Label>
              <Form.Control
                type="password"
                value={selectedUser.password ? "" : "enter your password"}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: "black" }}>Education : </Form.Label>
              <Form.Select
                className="form-select"
                aria-label="Education"
                id="userEducation"
                value={selectedUser.education}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    education: e.target.value,
                  })
                }
              >
                <option value="Bachelor of Information Technology">
                  Bachelor of Information Technology
                </option>
                <option value="Diploma in IT">Diploma in IT</option>
                <option value="Bachelor of Computer Science">
                  Bachelor of Computer Science
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ color: "black" }}>Role : </Form.Label>
              <Form.Select
                className="form-select"
                aria-label="Role"
                id="userRole"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    role: e.target.value,
                  })
                }
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="STUDENT">STUDENT</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ color: "black" }}>Phone : </Form.Label>
              <Form.Control
                type="text"
                value={selectedUser.phone}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, phone: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChangesForUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserManagement;
