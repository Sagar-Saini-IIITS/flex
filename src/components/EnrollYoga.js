import React, { useContext, useState } from 'react'
import taskContext from '../context/tasks/taskContext';


const AddTask = (props) => {

  const context = useContext(taskContext);
  const { addTask } = context; 
    const [task, setTask] = useState({ paymentID: "", batch: "56", month: "", year:"" })
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value }) 
  }

  const handleClick = (e) => {
    e.preventDefault(); 
    addTask(task.paymentID, task.batch, task.month,task.year);
    setTask({ paymentID: "", batch: "56", month: "", year:"" })
    props.showAlert("Task Added Successfully", "success");
  }

  return (
    <div className="mtext">
      <h1 className='mheading my-2'> Enroll for Yoga Classes </h1>
      <form>
        <div className="d-flex justify-content-start my-4">
          <div className="" style={{ width: "40%", marginRight: "2%" }}>
            <label htmlFor="pID" className="form-label">Payment ID</label>
            <input type="text" className="form-control" placeholder="min length = 3" id="pID" name="paymentID" value={task.paymentID} onChange={onChange} minLength={3} required />
          </div>
          <div className="" style={{ width: "40%" }}>
           
          <label htmlFor="batch" className="form-label ">Batch</label>
            <select className="form-select" id="batch" name="batch" value={task.batch} onChange={onChange}>
              <option value={"56"} >5-6</option>
              <option value={"67"} >6-7</option>
              <option value={"78"} >7-8</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>Enroll</button>
      </form>


    </div>
  )
}

export default AddTask