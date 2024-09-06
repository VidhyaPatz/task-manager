'use client';
import {React, useEffect, useState} from "react";
import Form from "@/components/Form";
import Header from "@/components/Header";
import TaskHero from "@/components/TaskHero";
import TaskList from "@/components/TaskList";
import axios from 'axios';

// Main component housing the webpage
function Home() {
  const [tasks, setTasks] = useState([]);

  // Fetches tasks from the database
  useEffect(() => {
    axios
      .get('http://localhost:5002/tasks')
      .then((response) => {
          var data = response.data;
          setTasks(data);
      })
      .catch((error) => {
          console.log(error);
      });
  }, []);

  const tasks_completed = tasks.filter(
    (task) => task.completed === true
  ).length;
  const total_tasks = tasks.length;

  return (
    <div className="wrapper">
      <Header />
      <TaskHero tasks_completed={tasks_completed} total_tasks={total_tasks} />
      <Form setTasks={setTasks}/>
      <TaskList tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}
export default Home;