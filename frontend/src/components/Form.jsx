// src/components/Form.jsx
'use client';
import axios from 'axios';

import { IoIosAdd } from "react-icons/io";

// Components for creating new tasks
function Form({ setTasks }) {
  // Function for submitting new task
  const handleSubmit = (event) => {
    event.preventDefault();

    const taskTitle = event.target.formTask.value;
    const description = event.target.formDescription.value;
    const dueDatetime = event.target.formDueDatetime.value;

    const data = {
      taskTitle: taskTitle,
      description: description,
      completed: false,
      dueDatetime: dueDatetime,
    };

    // Http post request for creating a new task
    axios
      .post(`http://localhost:5002/tasks/`, data)
      .then((response) => {
        setTasks((prevTasks) => [
          ...prevTasks,
          { _id: response.data._id, taskTitle: taskTitle, description: description, completed: false, dueDatetime: dueDatetime },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    // reset the form
    event.target.reset();
  };
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="formTask">
        <input
          type="text"
          name="formTask"
          id="formTask"
          placeholder="Task"
        />
      </label>
      <label htmlFor="formDescription">
        <input
          type="text"
          name="formDescription"
          id="formDescription"
          placeholder="Description"
        />
      </label>
      <label htmlFor="formDueDatetime">
        <input
          type="datetime-local"
          name="formDueDatetime"
          id="formDueDatetime"
        />
      </label>
      <button>
        <span className="visually-hidden">Submit</span>
        <IoIosAdd size = {40}/>
      </button>
    </form>
  );
}
export default Form;