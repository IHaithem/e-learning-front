import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSearchContext } from '../layout/SearchContext';
import './Style.css';

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const { searchResults, searched } = useSearchContext();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
    const result = await axios.get('http://localhost:8080/student',config);
    setStudents(result.data);
  };

  const { id } = useParams();

  const deleteStudent = async (id) => {
    const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
    await axios.delete(`http://localhost:8080/student/${id}`,config);
    loadStudents();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="text-center mb-2">
          <Link className="details btn btn-outline-success mx-2" to={'/AddStudent'}>
            Add Student
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
              <th scope="col">speciality</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {searched && searchResults.length === 0 && <tr><td colSpan="8">No results found.</td></tr>}
            {searched && searchResults.length > 0 && (
              searchResults.map((student, index) => (
                <tr key={student.id}>
                  <th scope="row">{student.id}</th>
                  <td>{student.username}</td>
                  {/* <td>{student.password}</td> */}
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.birthdate}</td>
                  <td>{student.email}</td>
                  <td>{student.sp}</td>
                  <td>
                    <Link
                      className="btn btn-success mx-2 details"
                      to={`/ViewStudent/${student.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-success mx-2 details"
                      to={`/EditStudent/${student.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!searched && students.map((student, index) => (
              <tr key={student.id}>
                <th scope="row">{student.id}</th>
                <td>{student.username}</td>
                {/* <td>{student.password}</td> */}
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.birthdate}</td>
                <td>{student.email}</td>
                <td>{student.sp}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/ViewStudent/${student.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/EditStudent/${student.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteStudent(student.id)}
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
