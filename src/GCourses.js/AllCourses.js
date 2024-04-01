// AllCourses.js
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useSearchContext } from '../layout/SearchContext';
import './Style.css';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const { searchResults, searched } = useSearchContext();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
    // Fetch courses when the component mounts
    fetch('http://localhost:8080/course',config)
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []); // Provide an empty dependency array to run the effect only once during mount

  return (
    <div>
      <h1 className="text-center mb-4 pt-4">All courses</h1>
      <div  className="mb-3 d-flex justify-content-center">
        <Link className="details btn btn-outline-success mx-2" to={'/AddCourse'}>
          Add Course
        </Link>
        <Link className="details btn btn-outline-success mx-2" to={'/AdminHome'}>
            Home
          </Link>
          </div>
      <div className="mb-3 d-flex flex-wrap justify-content-center">
        {searched && searchResults.length === 0 && <p>No results found.</p>}
        {searched && searchResults.length > 0 && (
          searchResults.map(course => (
            <div key={course.id} className="mr-2 mb-2">
              <Card style={{ width: '18rem', margin: '10px' }} className="card">
                <Card.Body>
                  <Card.Title className="cardTitle">{course.courseName}</Card.Title>
                  <Card.Text>
                    Teacher: {course.teacher.firstName} {course.teacher.lastName}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
        {!searched &&
          courses.map(course => (
            <div key={course.id}>
              <Card style={{ width: '18rem', margin: '10px' }} className="card">
                <Card.Body>
                  <Card.Title className="cardTitle">{course.courseName}</Card.Title>
                  <Card.Text>
                    Teacher: {course.teacher.firstName} {course.teacher.lastName}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCourses;
