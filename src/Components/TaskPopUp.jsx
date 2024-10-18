import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function TaskPopUp({ title, description, completed }) {
  return (
    <Popup trigger={<button className="view-details-button">View Details</button>} position="right center">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Status: {completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    </Popup>
  );
}

export default TaskPopUp;
