import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSearchContext } from '../layout/SearchContext';
import './Style.css';

export default function AllTeachers() {
  const [teachers, setTeachers] = useState([]);
  const { searchResults, searched } = useSearchContext();
  const navigate = useNavigate(); 
  const jwtToken = localStorage.getItem('jwt'); 


  useEffect(() => {
    loadTeachers();
  }, []);

const loadTeachers = async () => {
    try {
        const result = await axios.get('http://localhost:8080/teacher', {
          headers: {
            Authorization: `Bearer ${jwtToken}`, 
          },
        });
        setTeachers(result.data);
      } catch (error) {
        console.error('Error loading teachers:', error.response?.data || error.message);
        navigate('/SignIn');
      }
  };

  const { id } = useParams();

  const deleteTeacher = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/teacher/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        loadTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error.response?.data || error.message);
        navigate('/SignIn'); 
      }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="text-center mb-2">
          <Link className="details btn btn-outline-success mx-2" to={'/AddTeacher'}>
            Add Teacher
          </Link>
          <Link className="details btn btn-outline-success mx-2" to={'/AdminHome'}>
            Home
          </Link>
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">username</th>
              {/* <th scope="col">password</th> */}
              <th scope="col">firstName</th>
              <th scope="col">lastName</th>
              <th scope="col">birthdate</th>
              <th scope="col">email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {searched && searchResults.length === 0 && <tr><td colSpan="8">No results found.</td></tr>}
            {searched && searchResults.length > 0 && (
              searchResults.map((teacher, index) => (
                <tr key={teacher.id}>
                  <th scope="row">{teacher.id}</th>
                  <td>{teacher.username}</td>
                  {/* <td>{teacher.password}</td> */}
                  <td>{teacher.firstName}</td>
                  <td>{teacher.lastName}</td>
                  <td>{teacher.birthdate}</td>
                  <td>{teacher.email}</td>
                  <td>
                    <Link
                      className="btn btn-success mx-2"
                      to={`/ViewTeacher/${teacher.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-success mx-2"
                      to={`/EditTeacher/${teacher.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteTeacher(teacher.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!searched && teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <th scope="row">{teacher.id}</th>
                <td>{teacher.username}</td>
                {/* <td>{teacher.password}</td> */}
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.birthdate}</td>
                <td>{teacher.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/ViewTeacher/${teacher.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/EditTeacher/${teacher.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteTeacher(teacher.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
