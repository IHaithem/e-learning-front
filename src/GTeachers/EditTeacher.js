import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';

export default function EditTeacher() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [teacher, setTeacher] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        email: "",
        role: "TEACHER",
    });
    const { username, password, firstName, lastName, birthdate, email, role } = teacher;

    const onInputChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadTeacher();
    }, []);

    let userRole; // Declaration moved outside of the onSubmit function

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username,
            password,
            firstName,
            lastName,
            birthdate,
            email,
            role,
        };
        const jwtToken = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        };
        await axios.put(`http://localhost:8080/teacher/${id}`, payload, config);
        // Determine the user role
        userRole = jwtDecode(jwtToken).role;
        if (userRole === 'ADMIN') {
            navigate(`/ViewTeacher/${id}`);
        } else if (userRole === 'TEACHER') {
            navigate('/teacherHome',{ state: { username: username } });
        }
    };

    const loadTeacher = async () => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        };
        const result = await axios.get(`http://localhost:8080/teacher/${id}`, config);
        setTeacher(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow border-dark">
                    <h2 className="text-center m-4">Edit Teacher</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label"> username  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label"> firstName  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label"> lastName  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label"> birthdate  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the birthdate"
                                name="birthdate"
                                value={birthdate}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"> email  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the email"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div  className="mb-3 d-flex justify-content-center">
                        <button type="submit" className="details btn btn-outline-success">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to={userRole === 'ADMIN' ? "/AllTeachers" : "/teacherHome"} state={{username: username}}>
                            Cancel
                        </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
