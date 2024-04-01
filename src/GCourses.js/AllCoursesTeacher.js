import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import './Style.css';

const AllCoursesTeacher = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
    // Fetch courses when the component mounts
    fetch('http://localhost:8080/course/teacher/' + id,config)
      .then(response => response.json())
      .then(data => setCourses(data));
  }, [id]);

  return (
    <div>
      <h1 className="text-center mb-4 pt-4">My courses</h1>
      <div className="mb-3 d-flex flex-wrap justify-content-center">
        {courses.map(course => (
          <div key={course.id} className="mr-2 mb-2">
            <Card style={{ width: '18rem', margin: '10px' }}  className="card">
              <Card.Body>
                <Card.Title className="cardTitle">{course.courseName}</Card.Title>
                <Card.Text>
                  Teacher: {course.teacher.firstName} {course.teacher.lastName}
                </Card.Text>
              </Card.Body>
              <Link className="details btn btn-outline-primary mx-2"  to={`/ViewCourse/${course.id}`}>View Course Details</Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesTeacher;