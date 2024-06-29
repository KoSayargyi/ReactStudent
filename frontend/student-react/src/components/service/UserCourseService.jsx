import axios from "axios";

class UserCourseService {
  static BASE_URL = "http://localhost:8080/adminUser";

  static insertedUserCourse = async (coursesId, token) => {
    const myObj = {
      courseId: coursesId,
    };
    console.log(myObj);
    try {
      const res = await axios.put(
        `${UserCourseService.BASE_URL}/create`,
        myObj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  static deletedUserCourse = async (id, studentId, token) => {
    try {
      const res = await axios.delete(
        `${UserCourseService.BASE_URL}/delete/${id}/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}

export default UserCourseService;
