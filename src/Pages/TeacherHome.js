import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './TeacherHome.css';


const TeacherHome = () => {
  const [id, setIdt] = useState(null);
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    setIdt(jwtDecode(jwtToken).userId)
  }, []);

  const location = useLocation();
  const {username} = location.state;

  return (
    <div class="welcome">
      <div class="welcome_content">
      <h1 className="mb-4" class="welcome_title">Welcome, dear {username}!</h1>
      <h5 class="welcome_msg">Here is, in you disposition, your personnal student space where you can check your assigned courses and manage your profile.</h5>
      </div>
      <div className="row" class="welcome_links" id="well">
        <div class="part">
        <div id="pic7"></div>
        <h6 class="part_text">Manage your personnal profile information</h6>
          <Link to={`/EditTeacher/${id}`} className="btn btn-primary btn-lg btn-block" id="click">
            Edit Profile
          </Link>
        </div>
        <div class="part" id="part7">
        <div id="pic8"></div>
        <h6 class="part_text">View your assigned courses</h6>
          <Link to={`/AllCoursesTeacher/${id}`} className="btn btn-success btn-lg btn-block" id="click">
            My Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
