import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8080";

  static async login(email, password) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData, token) {
    try {
      const res = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllActiveUsers(token) {
    try {
      const res = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllActiveStudents(token) {
    try {
      const res = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getStudent(token) {
    try {
      const res = await axios.get(
        `${UserService.BASE_URL}/adminUser/get-student`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId, token) {
    try {
      const res = await axios.get(
        `${UserService.BASE_URL}/admin/get-user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId, token) {
    try {
      const res = await axios.delete(
        `${UserService.BASE_URL}/admin/delete/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId, userData, token) {
    try {
      const res = await axios.put(
        `${UserService.BASE_URL}/admin/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static isStudent() {
    const role = localStorage.getItem("role");
    return role === "STUDENT";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
