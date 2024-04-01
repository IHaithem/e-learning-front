import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';

export default function ViewAdministrator() {

    let navigate = useNavigate();
    const [administrator, setAdministrator] = useState({
        username: "",
        // password: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        email: "",
        adminLevel: ""
    },
    );

    const { id } = useParams();

    useEffect(() => {
        loadAdministrator();
    }, []);

    const loadAdministrator = async () => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        };
        const result = await axios.get(`http://localhost:8080/administrator/${id}`, config);
        setAdministrator(result.data);
    };

    const deleteAdministrator = async (id) => {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        };
        await axios.delete(`http://localhost:8080/administrator/${id}`, config)
        navigate("/AllAdministrators");
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow border-dark">
                    <h2 className="text-center m-4">Administrator {administrator.username} Details</h2>

                    <div className="card">
                        <div className="card-header">

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>username: </b>
                                    {administrator.username}
                                </li>
                                {/* <li className="list-group-item">
                                    <b>password: </b>
                                    {administrator.password}
                                </li> */}
                                <li className="list-group-item">
                                    <b>firstName: </b>
                                    {administrator.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>lastName: </b>
                                    {administrator.lastName}
                                </li>
                                <li className="list-group-item">
                                    <b>birthdate: </b>
                                    {administrator.birthdate}
                                </li>
                                <li className="list-group-item">
                                    <b>email: </b>
                                    {administrator.email}
                                </li>
                                <li className="list-group-item">
                                    <b>adminLevel: </b>
                                    {administrator.adminLevel}
                                </li>

                            </ul>
                        </div>
                    </div>


            
                    <Link className="btn btn-success my-2"
                        to={`/EditAdministrator/${administrator.id}`}
                    >
                        Edit
                    </Link>
                    <button className='btn btn-danger mx-2'
                        onClick={() => deleteAdministrator(administrator.id)}
                    >Delete</button>
                

                </div>
            </div>
            <div className="text-center mt-2">
                <Link className="details btn btn-outline-success" to={"/AllAdministrators"}>
                    All Administrators
                </Link>
            </div>
        </div>
    );
}