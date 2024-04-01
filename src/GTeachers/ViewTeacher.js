import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';

export default function ViewTeacher() {

    let navigate = useNavigate();
    const [teacher, setTeacher] = useState({
        username: "",
        // password: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        email: "",
    },
    );

    const { id } = useParams();

    useEffect(() => {
        loadTeacher();
    }, []);

    const loadTeacher = async () => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        const result = await axios.get(`http://localhost:8080/teacher/${id}`,config);
        setTeacher(result.data);
    };

    const deleteTeacher = async (id) => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        await axios.delete(`http://localhost:8080/teacher/${id}`,config)
        navigate("/AllTeachers");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow border-dark">
                    <h2 className="text-center m-4">Teacher {teacher.username} Details</h2>

                    <div className="card">
                        <div className="card-header">

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>username: </b>
                                    {teacher.username}
                                </li>
                                {/* <li className="list-group-item">
                                    <b>password: </b>
                                    {teacher.password}
                                </li> */}
                                <li className="list-group-item">
                                    <b>firstName: </b>
                                    {teacher.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>lastName: </b>
                                    {teacher.lastName}
                                </li>
                                <li className="list-group-item">
                                    <b>birthdate: </b>
                                    {teacher.birthdate}
                                </li>
                                <li className="list-group-item">
                                    <b>email: </b>
                                    {teacher.email}
                                </li>


                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2"
                        to={`/EditTeacher/${teacher.id}`}
                    >
                        Edit
                    </Link>
                    <button className='btn btn-danger mx-2'
                        onClick={() => deleteTeacher(teacher.id)}
                    >Delete</button>
                </div>
            </div>
            <div className="text-center mt-2">

                <Link className="details btn btn-outline-success" to={"/AllTeachers"}>
                    All Teachers
                </Link>
            </div>
        </div>
    );
}