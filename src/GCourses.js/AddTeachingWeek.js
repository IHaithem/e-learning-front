import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Style.css';

const AddTeachingWeek = () => {
  let navigate = useNavigate();
  const { courseId } = useParams();

  const [teachingWeek, setTeachingWeek] = useState({
    weekNumber: "",
    title: "",
    description: "",
    materials: [], 
    materialNames: [],
  });

  const { weekNumber, title, description, materials } = teachingWeek;

  const onInputChange = (e) => {
    setTeachingWeek({ ...teachingWeek, [e.target.name]: e.target.value });
  };

  const onMaterialChange = (index, e) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = e.target.value;
    setTeachingWeek({ ...teachingWeek, materials: updatedMaterials });
  };

  const onMaterialNameChange = (index, e) => {
    const updatedMaterialNames = [...teachingWeek.materialNames];
    updatedMaterialNames[index] = e.target.value;
    setTeachingWeek({ ...teachingWeek, materialNames: updatedMaterialNames });
  };

  const addMaterialField = () => {
    setTeachingWeek({ ...teachingWeek, materials: [...materials, ""] });
  };

  const removeMaterialField = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    setTeachingWeek({ ...teachingWeek, materials: updatedMaterials });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
      await axios.post(`http://localhost:8080/teachingWeek/course/${courseId}`, teachingWeek, config);
      navigate(`/ViewCourse/${courseId}`);
    } catch (error) {
      console.error("Error adding TeachingWeek:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow border-dark">
          <h2 className="text-center m-4">Add Teaching Week</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="weekNumber" className="form-label">
                Week Number
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the week number"
                name="weekNumber"
                value={weekNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Materials </label>
              {materials.map((material, index) => (
                <div key={index} className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Material ${index + 1}`}
                    value={material}
                    onChange={(e) => onMaterialChange(index, e)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Material ${index + 1} Name`}
                    value={teachingWeek.materialNames[index] || ''}
                    onChange={(e) => onMaterialNameChange(index, e)}
                  />
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => removeMaterialField(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button className="details btn btn-outline-primary pl-2" type="button" onClick={addMaterialField}>
                Add Material
              </button>
            </div>

            <div className="mb-3 d-flex justify-content-center">
            <button type="submit" className="details btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to={`/ViewCourse/${courseId}`}>
              Cancel
            </Link>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeachingWeek;
