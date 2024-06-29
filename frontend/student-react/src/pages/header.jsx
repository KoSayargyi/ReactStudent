import { useNavigate } from "react-router-dom";
import UserService from "../components/service/UserService";
import "../index.css";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    UserService.logout();
    navigate("/");
  };
  const userName = localStorage.getItem("name");

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-4);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div id="testheader">
      <div className="container">
        <div className="row">
          <div className="col-md-5 ">
            <h3 style={{ color: "green" }}>Student Registration</h3>
          </div>
          <div className="col-md-6" style={{ color: "green" }}>
            <p>User Name : {userName}</p>
            <p>Current Date : {getCurrentDate()} </p>
          </div>
          <div className="col-md-1">
            <input
              type="button"
              className="btn btn-primary"
              id="lgnout-button"
              onClick={handleLogout}
              value="Log Out"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
