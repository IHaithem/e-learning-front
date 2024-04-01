import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';

export default function AddTeacher() {
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

    const { username, password, firstName,lastName, birthdate, email ,role } = teacher;

    const onInputChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };


    const onSubmit = async (e) => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        e.preventDefault();
        await axios.post("http://localhost:8080/teacher", teacher, config);
        navigate(`/AllTeachers`);
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow border-dark">
                    <h2 className="text-center m-4">Add Teacher</h2>

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
                            <label htmlFor="password" className="form-label"> password  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the password"
                                name="password"
                                value={password}
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

                        <div className="mb-3 d-flex justify-content-center">
                        <button type="submit" className="details btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/AllTeachers">
                            Cancel
                        </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}