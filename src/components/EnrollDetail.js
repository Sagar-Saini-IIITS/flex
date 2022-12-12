import React, { useContext } from 'react'
import taskContext from '../context/tasks/taskContext';

const TaskItem = (props) => {
    const context = useContext(taskContext);
    const { deleteTask } = context;
    const { task, updateTask } = props;
    let batchvalue= props.task.batch;
    return (
        <div className=' col-md-4'>
            <div className="card my-3">
                <div className="card-body pb-5 taskitem">
                    <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{task.month}, {task.year}</h5>
                    <div>
                    <i className="far fa-trash-alt mx-2" onClick={()=>{ deleteTask(task._id);
    props.showAlert("Deleted Successfully","success");}}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{ updateTask(task); }}></i>
                    </div>
                    </div>
                    <p className="card-text">Batch: {task.batch[0]}-{task.batch[1]} AM</p>
                    <p className="card-text">Payment ID: {task.paymentID}</p>
                  
                </div>
            </div>

        </div>
    )
}

export default TaskItem;