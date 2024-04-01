import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';

const AddCourse = () => {
  let navigate = useNavigate();
  const { teacherId } = useParams();

  const [course, setCourse] = useState({
    courseName: "",
    selectedTeacher: "", // Added selectedTeacher property to store the selected teacher
    sp:"",
  });

  const [teachers, setTeachers] = useState([]); // Added state for teachers

  useEffect(() => {
    // Fetch the list of teachers when the component mounts
    const fetchTeachers = async () => {
      try {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get("http://localhost:8080/teacher",config); 
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error.message);
      }
    };

    fetchTeachers();
  }, []);

  const { courseName, selectedTeacher, sp } = course;

  const onInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
      // Use selectedTeacher in the request payload
      await axios.post(`http://localhost:8080/course/teacher/${selectedTeacher}`, {
        courseName,sp,
      },config);
      navigate(`/AllCourses`);
    } catch (error) {
      console.error("Error adding course:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow border-dark">
          <h2 className="text-center m-4">Add Course</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="courseName" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the course name"
                name="courseName"
                value={courseName}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sp" className="form-label">
                Course speciality
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the course speciality"
                name="sp"
                value={sp}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            {/* Dropdown menu for selecting the teacher */}
            <div className="mb-3">
              <label htmlFor="selectedTeacher" className="form-label">
                Select Teacher
              </label>
              <select
                className="form-select"
                name="selectedTeacher"
                value={selectedTeacher}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value="" disabled>
                  Choose a teacher
                </option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div  className="mb-3 d-flex justify-content-center">
            <button type="submit" className="details btn btn-outline-success">
              Add Course
            </button>
            <Link className="btn btn-outline-danger mx-2" to={`/AllCourses`}>
              Cancel
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
