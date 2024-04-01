import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchContext } from './SearchContext';
import './Navbar.css';

function MyNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setResults } = useSearchContext();
  const [searchTerm, setSearchTerm] = useState('');

  const getSearchBarContent = () => {
    const path = location.pathname.toLowerCase();

    const buttonStyle = {
      height: '40px',
      padding: '6px 12px',
      boxSizing: 'border-box',
    };

    if (path === '/allstudents') {
      return (
        <>
          <div style={{
            marginRight: '10px', display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '30px'
          }}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" style={buttonStyle} onClick={handleSearchStudents}>
              Search
            </button>
          </div>
          <nav>
            <div className="navbar-container">
              <a href='/allStudents' className="nav-link">Students <span></span></a>
              <a href='/allAdministrators' className="nav-link">Admins<span></span></a>
              <a href='/allTeachers' className="nav-link">Teachers <span></span></a>
              <a href='/AllCourses' className="nav-link">Courses <span></span></a>
            </div>
          </nav>
        </>
      );
    } else if (path === '/allteachers') {
      return (
        <>
          <div style={{
            marginRight: '10px', display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '30px'
          }}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" style={buttonStyle} onClick={handleSearchTeachers}>
              Search
            </button>
          </div>
          <nav>
            <div className="navbar-container">
              <a href='/allStudents' className="nav-link">Students <span></span></a>
              <a href='/allAdministrators' className="nav-link">Admins<span></span></a>
              <a href='/allTeachers' className="nav-link">Teachers <span></span></a>
              <a href='/AllCourses' className="nav-link">Courses <span></span></a>
            </div>
          </nav>
        </>
      );
    } else if (path === '/alladministrators') {
      return (
        <>
          <div style={{
            marginRight: '10px', display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '30px'
          }}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search administrators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" style={buttonStyle} onClick={handleSearchAdministrators}>
              Search
            </button>
          </div>
          <nav>
            <div className="navbar-container">
              <a href='/allStudents' className="nav-link">Students <span></span></a>
              <a href='/allAdministrators' className="nav-link">Admins<span></span></a>
              <a href='/allTeachers' className="nav-link">Teachers <span></span></a>
              <a href='/AllCourses' className="nav-link">Courses <span></span></a>
            </div>
          </nav>
        </>
      );
    } else if (path === '/allcourses') {
      return (
        <>
          <div style={{
            marginRight: '10px', display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '30px'
          }}>
            <input
              style={{ width: '150px' }}
              className="form-control me-2"
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" style={buttonStyle} onClick={handleSearchCourses}>
              Search
            </button>
          </div >

          <nav>
            <div className="navbar-container">
              <a href='/allStudents' className="nav-link">Students <span></span></a>
              <a href='/allAdministrators' className="nav-link">Admins<span></span></a>
              <a href='/allTeachers' className="nav-link">Teachers <span></span></a>
              <a href='/AllCourses' className="nav-link">Courses <span></span></a>
            </div>
          </nav>
        </>
      );
    } else if (path === '/adminhome') {
      return (
        <>
          <nav>
            <div className="navbar-container">
              <a href='/allStudents' className="nav-link">Students <span></span></a>
              <a href='/allAdministrators' className="nav-link">Admins<span></span></a>
              <a href='/allTeachers' className="nav-link">Teachers <span></span></a>
              <a href='/AllCourses' className="nav-link">Courses <span></span></a>
            </div>
          </nav>

        </>
      );
    } else if (path === '/teacherhome') {
      return (
        <> 
          <ion-icon id="iconedit" name="create-outline"></ion-icon>
        </>
      );
    };


  };

  const handleSearchStudents = () => {
    const jwtToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    };
    // Make the API request with the search term for students
    fetch(`http://localhost:8080/student/search/${searchTerm}`, config)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        // Redirect to the same page with the updated search results
        navigate('/allStudents');
      })
      .catch(error => {
        console.error('Error searching students:', error.message);
      });
  };

  const handleSearchTeachers = () => {
    const jwtToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    };
    // Make the API request with the search term for teachers
    fetch(`http://localhost:8080/teacher/search/${searchTerm}`, config)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        // Redirect to the same page with the updated search results
        navigate('/allteachers');
      })
      .catch(error => {
        console.error('Error searching teachers:', error.message);
      });
  };

  const handleSearchAdministrators = () => {
    const jwtToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    };
    // Make the API request with the search term for administrators
    fetch(`http://localhost:8080/administrator/search/${searchTerm}`, config)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        // Redirect to the same page with the updated search results
        navigate('/alladministrators');
      })
      .catch(error => {
        console.error('Error searching administrators:', error.message);
      });
  };

  const handleSearchCourses = () => {
    const jwtToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    };
    // Make the API request with the search term for courses
    fetch(`http://localhost:8080/course/search/${searchTerm}`, config)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        // Redirect to the same page with the updated search results
        navigate('/allcourses');
      })
      .catch(error => {
        console.error('Error searching courses:', error.message);
      });
  };

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwt');
    // Redirect to the sign-in page
    navigate('/signin');
  };



  return (
    <nav id='navmain'>
      <div className="navbar-container">
        <h3>E-learning Université Constantine 2</h3>
        <div className="search-bar">
          {getSearchBarContent()}
          <div style={{ paddingLeft: '10px' }} onClick={handleLogout}><ion-icon name="log-out-outline" id="iconlogout"></ion-icon></div>

        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;
