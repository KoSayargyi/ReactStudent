import axios from "axios";
import UserService from "./UserService";

class CourseService {
  static BASE_URL = "http://localhost:8080";

  static createdCourse = async (name, token) => {
    try {
      const res = await axios.post(
        `${CourseService.BASE_URL}/admin/create`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  static deletedCourse = async (id, token) => {
    try {
      const res = await axios.delete(
        `${CourseService.BASE_URL}/admin/deleted/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  static updatedCourse = async (id, name, token) => {
    try {
      const res = await axios.put(
        `${CourseService.BASE_URL}/admin/edited/${id}`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  static getAllCourses = async (token) => {
    try {
      const res = await axios.get(
        `${CourseService.BASE_URL}/adminUser/getAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  static updateCourse = async (id, course, token) => {
    try {
      const res = await axios.put(
        `${CourseService.BASE_URL}/admin/edited/${id}`,
        course,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  static gtCoursesForLoginStuden = async (token) => {
    try {
      const res = await axios.get(
        `${CourseService.BASE_URL}/adminUser/get-Course`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  static getCoursesByUserId = async (token) => {
    const isAdmin = UserService.isAdmin();
    try {
      if (isAdmin) {
        const res = await axios.get(
          `${CourseService.BASE_URL}/adminUser/getUser-Courses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res.data;
      } else {
        const res = await axios.get(
          `${CourseService.BASE_URL}/adminUser/getUserCourses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  };
}

export default CourseService;
