import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';

export default function ViewStudent() {

    let navigate = useNavigate();
    const [student, setStudent] = useState({
        username: "",
        // password: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        email: "",
        sp:"",
    },
    );

    const { id } = useParams();

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        const result = await axios.get(`http://localhost:8080/student/${id}`,config);
        setStudent(result.data);
    };

    const deleteStudent = async (id) => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        await axios.delete(`http://localhost:8080/student/${id}`,config)
        navigate("/AllStudents");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow border-dark">
                    <h2 className="text-center m-4">Student {student.username} Details</h2>

                    <div className="card">
                        <div className="card-header">

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>username: </b>
                                    {student.username}
                                </li>
                                {/* <li className="list-group-item">
                                    <b>password: </b>
                                    {student.password}
                                </li> */}
                                <li className="list-group-item">
                                    <b>firstName: </b>
                                    {student.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>lastName: </b>
                                    {student.lastName}
                                </li>
                                <li className="list-group-item">
                                    <b>birthdate: </b>
                                    {student.birthdate}
                                </li>
                                <li className="list-group-item">
                                    <b>email: </b>
                                    {student.email}
                                </li>
                                <li className="list-group-item">
                                    <b>speciality: </b>
                                    {student.sp}
                                </li>


                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2"
                        to={`/EditStudent/${student.id}`}
                    >
                        Edit
                    </Link>
                    <button className='btn btn-danger mx-2'
                        onClick={() => deleteStudent(student.id)}
                    >Delete</button>
                </div>
            </div>
            <div className="text-center mt-2">
                <Link className="details btn btn-outline-uccess" to={"/AllStudents"}>
                    All Students
                </Link>
            </div>
        </div>
    );
}