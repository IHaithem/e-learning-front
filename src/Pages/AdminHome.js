import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  return (
    <div class="welcome">
      <div class="welcome_content">
      <h1 className="mb-4" class="welcome_title">Welcome, Administrator!</h1>
      <h5 class="welcome_msg">Here is, in you disposition, the management of the different individuals and concepts that concern our faculty's education system.</h5>
      </div>
      <div className="row" class="welcome_links">
        <div class="part">
          <div id="pic1"></div>
          <h6 class="part_text">Manage the fellow administrators</h6>
          <Link to="/allAdministrators" className="btn btn-primary btn-lg btn-block" id="click">
            All Administrators
          </Link>
        </div>
        <div class="part">
        <div id="pic2"></div>
        <h6 class="part_text">Manage the faculty's students</h6>
          <Link to="/allStudents" className="btn btn-success btn-lg btn-block" id="click">
            All Students
          </Link>
        </div>
        <div class="part">
        <div id="pic3"></div>
        <h6 class="part_text">Manage the faculty's teachers</h6>
          <Link to="/allTeachers" className="btn btn-info btn-lg btn-block" id="click">
            All Teachers
          </Link>
        </div>
        <div class="part">
        <div id="pic4"></div>
        <h6 class="part_text">Manage the faculty's courses</h6>
          <Link to="/AllCourses" className="btn btn-info btn-lg btn-block" id="click">
            All Courses
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminHome;