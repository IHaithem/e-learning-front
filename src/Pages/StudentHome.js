import React, { useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './StudentHome.css';

const StudentHome = () => {
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    const decodedToken = jwtDecode(jwtToken);
    setStudentId(decodedToken.userId);
  }, []);

  const location = useLocation();
  const {username} = location.state;

  return (
    <div class="welcome" id="wel">
      <div class="welcome_content">
        <h1 className="mb-4" class="welcome_title">Welcome, dear { username }!</h1>
        <h5 class="welcome_msg">Here is, in you disposition, your personnal student space where you can check your courses related to your curriculam.</h5>
      </div>
      <div className="row" class="welcome_links" id="welA">
      <div class="part" id="part6">
        <div id="pic5"></div>
        <h6 class="part_text">View your curriculam's courses</h6>
          <Link to={`/AllCoursesStudent/${studentId}`} className="btn btn-success btn-lg btn-block" id="click">
            My Courses
          </Link>
      </div>
      </div>
    </div>
  );
};

export default StudentHome;
