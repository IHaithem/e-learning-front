import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Style.css';

const EditTeachingWeek = () => {
  let navigate = useNavigate();
  const { courseId, weekId } = useParams();

  const [teachingWeek, setTeachingWeek] = useState({
    weekNumber: '',
    title: '',
    description: '',
    materials: [],
    materialNames: [],
  });

  useEffect(() => {
    const fetchTeachingWeekDetails = async () => {
      try {
        const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get(`http://localhost:8080/teachingWeek/${weekId}`,config);
        const data = response.data;

        setTeachingWeek({
          weekNumber: data.weekNumber,
          title: data.title,
          description: data.description,
          materials: data.materials,
          materialNames: data.materialNames,
        });
      } catch (error) {
        console.error('Error fetching TeachingWeek details:', error.message);
      }
    };

    fetchTeachingWeekDetails();
  }, [weekId]);

  const onInputChange = (e) => {
    setTeachingWeek({ ...teachingWeek, [e.target.name]: e.target.value });
  };

  const onMaterialChange = (index, e) => {
    const updatedMaterials = [...teachingWeek.materials];
    updatedMaterials[index] = e.target.value;
    setTeachingWeek({ ...teachingWeek, materials: updatedMaterials });
  };

  const onMaterialNameChange = (index, e) => {
    const updatedMaterialNames = [...teachingWeek.materialNames];
    updatedMaterialNames[index] = e.target.value;
    setTeachingWeek({ ...teachingWeek, materialNames: updatedMaterialNames });
  };

  const addMaterialField = () => {
    setTeachingWeek({ ...teachingWeek, materials: [...teachingWeek.materials, ''], materialNames: [...teachingWeek.materialNames, ''] });
  };

  const removeMaterialField = (index) => {
    const updatedMaterials = [...teachingWeek.materials];
    updatedMaterials.splice(index, 1);

    const updatedMaterialNames = [...teachingWeek.materialNames];
    updatedMaterialNames.splice(index, 1);

    setTeachingWeek({ ...teachingWeek, materials: updatedMaterials, materialNames: updatedMaterialNames });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
        const updatedTeachingWeek = {
            ...teachingWeek,
            courseId: courseId, // Include courseId in the payload
          };
          const jwtToken = localStorage.getItem('jwt');
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        };
          await axios.put(`http://localhost:8080/teachingWeek/${courseId}/${weekId}`, updatedTeachingWeek, config);
          navigate(`/ViewCourse/${courseId}`);
        } catch (error) {
      console.error('Error updating TeachingWeek:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Teaching Week</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="weekNumber" className="form-label">
                Week Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the week number"
                name="weekNumber"
                value={teachingWeek.weekNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the title"
                name="title"
                value={teachingWeek.title}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the description"
                name="description"
                value={teachingWeek.description}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Materials</label>
              {teachingWeek.materials.map((material, index) => (
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
              <button className="btn btn-outline-primary" type="button" onClick={addMaterialField}>
                Add Material
              </button>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to={`/ViewCourse/1`}>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTeachingWeek
