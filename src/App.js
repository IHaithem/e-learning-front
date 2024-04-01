// App.js
import React from 'react';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';


import AllStudents from './GStudents/AllStudents';
import ViewStudent from './GStudents/ViewStudent';
import AddStudent from './GStudents/AddStudent';
import EditStudent from './GStudents/Editstudent';

import AllTeachers from './GTeachers/AllTeachers';
import ViewTeacher from './GTeachers/ViewTeacher';
import EditTeacher from './GTeachers/EditTeacher';
import AddTeacher from './GTeachers/AddTeacher';

import AllAdministrators from './GAdministrators/AllAdministrators';
import ViewAdministrator from './GAdministrators/ViewAdministrator';
import AddAdministrator from './GAdministrators/AddAdministrator';
import EditAdministrator from './GAdministrators/EditAdministrator';

import AllCoursesTeacher from './GCourses.js/AllCoursesTeacher';
import AllCoursesStudent from './GCourses.js/AllCoursesStudent';
import AllCourses from './GCourses.js/AllCourses';
import ViewCourse from './GCourses.js/ViewCourse';
import AddCourse from './GCourses.js/AddCourse';

import AddTeachingWeek from './GCourses.js/AddTeachingWeek';
import EditTeachingWeek from './GCourses.js/EditTeachingWeek';

import AdminHome from './Pages/AdminHome';
import TeacherHome from './Pages/TeacherHome'
import StudentHome from './Pages/StudentHome'; 
import SignIn from './Pages/SignIn';

import { SearchProvider } from './layout/SearchContext';

function App() {
  return (
    <SearchProvider>
    <div className="App">
      {/* to do
      -let every att required in forms */}
      <Router>
        <Navbar />
    <section id="section2">
      <Routes>
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/SignIn" element={<SignIn />} />

        <Route path="/allAdministrators" element={<AllAdministrators />} />
        <Route path="/ViewAdministrator/:id" element={<ViewAdministrator />} />
        <Route path="/AddAdministrator" element={<AddAdministrator />} />
        <Route path="/EditAdministrator/:id" element={<EditAdministrator />} />

        <Route path="/allStudents" element={<AllStudents />} />
        <Route path="/ViewStudent/:id" element={<ViewStudent />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/EditStudent/:id" element={<EditStudent />} />

        <Route path="/AllTeachers" element={<AllTeachers />} />
        <Route path="/ViewTeacher/:id" element={<ViewTeacher />} />
        <Route path="/EditTeacher/:id" element={<EditTeacher />} />
        <Route path="/AddTeacher" element={<AddTeacher />} />

        <Route path="/AllCoursesTeacher/:id" element={<AllCoursesTeacher />} />
        <Route path="/AllCoursesStudent/:id" element={<AllCoursesStudent />} />
        <Route path="/AllCourses" element={<AllCourses />} />
        <Route path="/ViewCourse/:courseId" element={<ViewCourse />} />
        <Route path="/AddCourse" element={<AddCourse />} />

        <Route path="/AddTeachingWeek/:courseId" element={<AddTeachingWeek />} />
        <Route path="/EditTeachingWeek/:courseId/:weekId" element={<EditTeachingWeek />} />

      </Routes>
      </section>
      </Router>
    </div>
    </SearchProvider>
  );
}

export default App;
