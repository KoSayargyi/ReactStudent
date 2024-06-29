import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import UserService from "../components/service/UserService";
import "../index.css";

function UserRegistration() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    education: "",
  });
  const [photo, setPhoto] = useState(null);
  const token = localStorage.getItem("token");

  const submitHandlerForUser = async (e) => {
    e.preventDefault();
    if (!photo) {
      setError("Photo is required.");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (photo) {
      data.append("file", photo);
    }

    try {
      const res = await UserService.register(data, token);
      setSuccess(res.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        education: "",
      });
      setPhoto(null);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className="main_contents">
        <div id="sub_content">
          <Form onSubmit={submitHandlerForUser} encType="multipart/form-data">
            <h2 className="col-md-6 offset-md-2 mb-5 mt-4">
              User Registration
            </h2>
            <div className="row mb-4">
              <div className="col-md-2"></div>
              {success && (
                <p className="success-message" style={{ color: "green" }}>
                  {success}
                </p>
              )}
              {error && (
                <p className="error-message" style={{ color: "red" }}>
                  {error}
                </p>
              )}
              <label htmlFor="name" className="col-md-2 col-form-label">
                Name
              </label>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-2"></div>
              <label htmlFor="gender" className="col-md-2 col-form-label">
                Gender
              </label>
              <div className="col-md-4">
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  value="Male"
                  name="gender"
                  checked={formData.gender === "Male"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="Female"
                  name="gender"
                  checked={formData.gender === "Female"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-2"></div>
              <label htmlFor="email" className="col-md-2 col-form-label">
                Email
              </label>
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-2"></div>
              <label htmlFor="password" className="col-md-2 col-form-label">
                Password
              </label>
              <div className="col-md-4">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-2"></div>
              <label htmlFor="phone" className="col-md-2 col-form-label">
                Phone
              </label>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-2"></div>
              <label htmlFor="userRole" className="col-md-2 col-form-label">
                Education
              </label>
              <div className="col-md-4">
                <select
                  className="form-select"
                  aria-label="Education"
                  id="userRole"
                  value={formData.education}
                  onChange={(e) =>
                    setFormData({ ...formData, education: e.target.value })
                  }
                >
                  <option value="Bachelor of Information Technology">
                    Bachelor of Information Technology
                  </option>
                  <option value="Diploma in IT">Diploma in IT</option>
                  <option value="Bachelor of Computer Science">
                    Bachelor of Computer Science
                  </option>
                </select>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-2"></div>
              <label htmlFor="photo" className="col-md-2 col-form-label">
                Photo
              </label>
              <div className="col-md-4">
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
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
export default UserRegistration;
