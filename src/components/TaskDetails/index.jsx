import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../Button';
import "./TaskDetails.css"

const TaskDetails = (task, handleTaskDetailsChange) => {
    const params = useParams()
    const history = useHistory()

    const handleBackButtonClick = () => {
        history.goBack()
    }
    return ( 
        <div>
            <div className="back-button-container">
                <Button onClick={handleBackButtonClick}>Voltar</Button>
            </div>
            <div className="task-details-container">
                <h2>{params.taskTitle}</h2>
                <textarea onChange={handleTaskDetailsChange}>
                    {params.taskDetails}
                </textarea>
            </div>
        </div>
     );
}
 
export default TaskDetails;