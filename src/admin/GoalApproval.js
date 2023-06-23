import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react'

function GoalApproval() {
  
  const[entities,setEntities] = useState([]);
  const updatedEntities=[];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/goals");
      console.log("hii")
      setEntities(response.data);
      console.log(entities)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  for(let i=0;i<entities.length;i++){
    if(entities[i]['approval']===false){
      updatedEntities.push(entities[i]);
    }
  }


  const handleApprove = async (id) => {
    try {
      await axios.put("http://localhost:8080/goal/"+id, { approval: true }); 
      setEntities((prevEntities) =>
        prevEntities.map((entity) =>
          entity.id === id ? { ...entity, approval: true } : entity
        )
      );
    } catch (error) {
      console.error('Error approving entity:', error);
    }
  };


  return (
    <>
    <div className='container'>
    <h2>Goal Approval List</h2>
    {updatedEntities.length === 0 ? (
        <p>No goals found.</p>
      ) : (
    <div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Goal Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Target Weight</th>
                    <th>Approve</th>
                </tr>
            </thead>
            <tbody>
                {updatedEntities.map((entity,index)=>(
                    <tr>
                        <td>{index+1}</td>
                        <td>{entity.goalName}</td>
                        <td>{entity.description}</td>
                        <td>{entity.duration}</td>
                        <td>{entity.targetWeight}</td>
                        <td>
                            <button onClick={()=>handleApprove(entity.id)} className='btn btn-success'>Approve</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )}
    </div></>
  )
}

export default GoalApproval