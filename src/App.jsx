import React ,{ useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid'
import './App.css';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import axios from 'axios';

import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import Header from './components/Header';
import TaskDetails from './components/TaskDetails';

function App() {
  const [tasks, setTasks] = useState([])
  
  useEffect(()=>{
    const fetchTasks = async () => {
      const {data} = await axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10')

      setTasks(data)
    }

    fetchTasks()
  }, [])

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [...tasks,{
      title: taskTitle,
      id: uuid(),
      completed: false,
      details: ''
    }]

    setTasks(newTasks)
  }
  const handleTaskClick = (taskId) =>{
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return {...task, completed: !task.completed}
      return task
    })
    setTasks(newTasks)
  } 
  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId)

    setTasks(newTasks)
  }
  const handleTaskDetailsChange = (taskId, details) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return {...task, details: details}
      return task
    })

    setTasks(newTasks)
  }
  return (
    <Router>
      <div className="container">
        <Header/>
        <Route path="/" exact render={()=>(
          <div>
            <AddTask handleTaskAddition={handleTaskAddition}/>
            <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDeletion={handleTaskDeletion} />
          </div>
        )}/>
        <Route path="/:taskTitle" exact component={TaskDetails(handleTaskDetailsChange)}/>
      </div>
    </Router>
  );
}

export default App;
