import React, { useState, useEffect } from 'react';
import './App.css';
import trash from './assets/trash1.png'

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const taskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  return (
    <div className='container'>
      <div className='todo-form'>
        <div className='header'>
          <h1>#todo</h1>
        </div>
        <div className='btn'>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        {filter !== "completed" ?
          <div className="input-form">
          <input className='input-text' type="text" value={inputValue} onChange={inputChange} placeholder='add details' />
          <button onClick={addTask}>Add</button>
          </div>
          :
          ""
        }
        <div className='task'>
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <input
                type="checkbox"
                checked={task.completed}
                onChange={() => taskCompletion(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}><img src={trash} alt="" /></button>
              </li>
          ))}
          </ul>
        </div>
        {filter === "completed" && tasks.length > 0 ? <button className='delete-btn' onClick={deleteAllTasks}><img src={trash} alt="" />Delete All</button> : ""}
      </div>
    </div>
  );
};

export default TodoApp;
