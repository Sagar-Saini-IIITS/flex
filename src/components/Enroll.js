import React, { useContext, useEffect, useRef, useState } from 'react'
import taskContext from '../context/tasks/taskContext';
import EnrollDetail from './EnrollDetail';
import EnrollYoga from './EnrollYoga';
import { useNavigate } from 'react-router-dom';

const Tasks = (props) => {
    const context = useContext(taskContext); // getting values from contest
    const { tasks, getTask, editTask } = context; // destructing the state and fn
    const [task, setTask] = useState({ id: "", epaymentID: "", batch: "", emonth: "",eyear:"" }) // maintaining dummy note state which will useful in  updating notes

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getTask();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);

    // filling value of data fields in editing mode as their original value
    const updateTask = (currentTask) => {
        ref.current.click();
        setTask({ id: currentTask._id, epaymentID: currentTask.paymentID, ebatch: currentTask.batch, emonth: currentTask.month, eyear: currentTask.year});

    }

    // changing value of note as we type
    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    // Editing Notes after we click Update Notes
    const handleClick = (e) => {
        editTask(task.id, task.epaymentID, task.ebatch, task.emonth,task.eyear);
        refClose.current.click();
        props.showAlert("Task Updated Successfully", "success");
    }

    return (
        <>
            <EnrollYoga showAlert={props.showAlert} />
            
            <div className='my-5'>
                <h2 className='tasks'> Previous Payments</h2>
                <div className="row my-4">
                    {tasks.length === 0 && 'No Previous Payments'}
                    {tasks.map((tasks) => { // mapping over all the notes of a user
                            return <EnrollDetail key={tasks._id} showAlert={props.showAlert} updateTask={updateTask} task={tasks} />
                        
                    })}

                </div>
            </div>
            
        </>
    )
}

export default Tasks