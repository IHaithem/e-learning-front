import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSearchContext } from '../layout/SearchContext';
import './Style.css';

export default function AllAdministrators() {
  const [administrators, setAdministrators] = useState([]);
  const { searchResults, searched } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {
    loadAdministrators();
  }, []);

  const loadAdministrators = async () => {
    try {
      const jwtToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      };
        const result = await axios.get('http://localhost:8080/administrator',config);
      setAdministrators(result.data);
    } catch (error) {
      console.error('Error loading administrators:', error.response?.data || error.message);
      navigate('/signin');
    }
  };

  const { id } = useParams();

  const deleteAdministrator = async (id) => {
    try {
      const jwtToken = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:8080/administrator/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });
      loadAdministrators();
    } catch (error) {
      console.error('Error deleting administrator:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="text-center mb-2">
          <Link className="details btn btn-outline-success mx-2" to={'/AddAdministrator'}>
            Add Administrator
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
              <th scope="col">firstName</th>
              <th scope="col">lastName</th>
              <th scope="col">birthdate</th>
              <th scope="col">email</th>
              <th scope="col">admin Level</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {searched && searchResults.length === 0 && <tr><td colSpan="9">No results found.</td></tr>}
            {searched && searchResults.length > 0 && (
              searchResults.map((administrator, index) => (
                <tr key={administrator.id}>
                  <th scope="row">{administrator.id}</th>
                  <td>{administrator.username}</td>
                  <td>{administrator.firstName}</td>
                  <td>{administrator.lastName}</td>
                  <td>{administrator.birthdate}</td>
                  <td>{administrator.email}</td>
                  <td>{administrator.adminLevel}</td>
                  <td>
                    <Link
                      className="btn btn-success mx-2 details"
                      to={`/ViewAdministrator/${administrator.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="details btn btn-outline-succes mx-2" id='details'
                      to={`/EditAdministrator/${administrator.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteAdministrator(administrator.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!searched && administrators.map((administrator, index) => (
              <tr key={administrator.id}>
                <th scope="row">{administrator.id}</th>
                <td>{administrator.username}</td>
                <td>{administrator.firstName}</td>
                <td>{administrator.lastName}</td>
                <td>{administrator.birthdate}</td>
                <td>{administrator.email}</td>
                <td>{administrator.adminLevel}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/ViewAdministrator/${administrator.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/EditAdministrator/${administrator.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteAdministrator(administrator.id)}
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
