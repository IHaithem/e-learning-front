import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import './Style.css';


const ViewCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [teachingWeeks, setTeachingWeeks] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    loadTeachingWeeks();
  }, [courseId]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    setUserRole(jwtDecode(jwtToken).role);
  }, []);

  const loadTeachingWeeks = async () => {
    const jwtToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    };
    // Fetch course details and associated teaching weeks when the component mounts
    const response = await axios.get(`http://localhost:8080/course/${courseId}`, config);
    const data = response.data;
    setCourse(data);
    setTeachingWeeks(data.teachingWeeks);
  };

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  const deleteTeachingWeek = async (id) => {
    const jwtToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    };
    await axios.delete(`http://localhost:8080/teachingWeek/${id}`, config);
    loadTeachingWeeks();
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-3 d-flex-wrap justify-content-center">
      <h1 className="text-center mb-4 pt-4">Course Details</h1>
      <Card style={{ width: '80%', margin: '10px'}} className='card mx-auto' id='card'>
        <Card.Body>
          <Card.Title className="cardTitle">{course.courseName}</Card.Title>
          <Card.Text>
            Teacher: {course.teacher.firstName} {course.teacher.lastName}
          </Card.Text>
          <Card.Text>Students: {course.students.length}</Card.Text>
        </Card.Body>
      </Card>
      {userRole === 'TEACHER' && (
        <div className="d-flex justify-content-center">
        <Link style={{marginBottom: '10px'}} className="btn btn-outline-primary mx-2 details" to={`/AddTeachingWeek/${course.id}`}>
          Add Teaching Week
        </Link>
        </div>
      )}

      <h2 className="text-center pt-2">Teaching Weeks</h2>
      {teachingWeeks.map((week) => (
        <Card key={week.id} style={{ width: '90%', margin: '10px' }} className='card mx-auto' id='week'>
          <Card.Body className="d-flex flex-column">
            <Card.Title className="cardTitle">
              Week {week.weekNumber}: {week.title}
            </Card.Title>
            <Card.Text>Description: {week.description}</Card.Text>
            <Card.Text>
              Materials:
              <ul>
                {week.materialNames.map((materialName, index) => (
                  <li
                    key={index}
                    onClick={() => openLink(week.materials[index])}
                    style={{ cursor: 'pointer', color: 'green' }}
                  >
                    {materialName}
                  </li>
                ))}
              </ul>
            </Card.Text>
            {userRole === 'TEACHER' && (
              <>
              <div>
                <Link
                  className="btn btn-outline-success mx-2 details"
                  to={`/EditTeachingWeek/${courseId}/${week.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => deleteTeachingWeek(week.id)}
                >
                  Delete
                </button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ViewCourse;
