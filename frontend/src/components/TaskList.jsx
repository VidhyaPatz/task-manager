'use client';
import {useRef, useState, useEffect} from "react";
import { FaEdit, FaTrash, FaCheckSquare } from "react-icons/fa";
import axios from 'axios';

function Item({ item, tasks, setTasks }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  // Converting from UTC to local time
  var itemDueDatetime = new Date(item?.dueDatetime);
  var h = itemDueDatetime.toLocaleString('pt-BR');
  var itemDueDatetimeLocal = `${h.substring(6, 10)}-${h.substring(3, 5)}-${h.substring(0, 2)}T${h.substring(12, 17)}`;
  //console.log(h);
  //console.log(itemDueDatetimeLocal);
  //pt-BR: 03/09/2021 17:56:58
  //YYYY-MM-DDTHH:mm

  // Function for toggling task as completed
  const completeTask = () => {
    const task = tasks.filter((task) => task._id === item?._id).at(0);

    const data = {
      taskTitle: task.taskTitle,
      description: task.description,
      completed: !task.completed,
      dueDatetime: task.dueDatetime,
    };

    // http patch request for updating the status of tasks
    axios
      .patch(`http://localhost:5002/tasks/${item?._id}`, data)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => { return task._id === item._id ? {...task, completed: !task.completed } : task})
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Functionality for editing task
  const handleEdit = () => {
    setEditing(true);
  };
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  // function for updating tasks
  const handleInpuSubmit = (event) => {
    const taskTitle = event.target.editformTask.value;
    const description = event.target.editformDescription.value;
    const completed = tasks.filter((task) => task._id === item._id).at(0).completed;
    const dueDatetime = new Date(event.target.editformDueDatetime.value);

    const data = {
      taskTitle: taskTitle,
      description: description,
      completed: completed,
      dueDatetime: dueDatetime,
    };

    // http patch request for updating of tasks
    axios
      .patch(`http://localhost:5002/tasks/${item?._id}`, data)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === item._id ? { ...task, taskTitle: taskTitle, description: description, completed: completed, dueDatetime: dueDatetime } : task
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
    

    event.preventDefault();
    setEditing(false);
  };


  // Function for deleting tasks
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5002/tasks/${item?._id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== item._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <li id={item?._id} className="task_item">
      {editing ? (
        <form className="editform" onSubmit={handleInpuSubmit}>
          <input
            ref={inputRef}
            type="text"
            id="editformTask"
            defaultValue={item?.taskTitle}
          />
          <input
            type="text"
            id="editformDescription"
            defaultValue={item?.description}
          />
          <input
            type="datetime-local"
            id="editformDueDatetime"
            defaultValue={itemDueDatetimeLocal}
          />
          <button>
            <FaCheckSquare size = {20}/>
          </button>
        </form>
        ) :
        (<><button className="task_items_left" onClick={completeTask}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          {item?.completed ? (
            <circle cx="15" cy="15" r="13" stroke="#5C7C89" fill="#5C7C89" strokeWidth="2"/>
          ) : (
            <circle cx="15" cy="15" r="13" stroke="#5C7C89" fill="transparent" strokeWidth="2"/>
          )}
        </svg>
        <div id="taskinfo">
          <p className="task" style={item.completed ? { textDecoration: "line-through" } : {}}>
            {item?.taskTitle}
          </p>
          <p className="description" style={item.completed ? { textDecoration: "line-through" } : {}}>
            {item?.description}
          </p>
          <p className="dueDatetime">
            {itemDueDatetime.toLocaleDateString('en-GB') + " " + itemDueDatetime.toLocaleTimeString()}
          </p>
        </div>  
        </button>
        <div className="task_items_right">
          <button onClick={handleEdit}>
            <span className="visually-hidden">Edit</span>
            <FaEdit size = {20}/>
          </button>
          <button onClick={handleDelete}>
            <span className="visually-hidden">Delete</span>
            <FaTrash size = {20}/>
          </button>
        </div>
        </>)
      }
    </li>
  );
}


function TaskList({ tasks, setTasks }) {
  return (
    <ol className="task_list">
      {tasks && tasks.length > 0 ? (
        tasks?.map((item, index) => <Item key={index} item={item} tasks={tasks} setTasks={setTasks}/>)
      ) : (
        <p>No Tasks Currently</p>
      )}
    </ol>
  );
}
export default TaskList;