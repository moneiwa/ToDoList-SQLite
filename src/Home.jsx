import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 


const Home = ({ onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState('Low');
  const [searchInquire, setSearchInquire] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [editPriority, setEditPriority] = useState('Low');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (name.trim() === '' || todo.trim() === '') {
      alert('Name and Task are required');
      return;
    }

    try {
      await axios.post('http://localhost:3001/todos', { name, todo, priority });
      setName('');
      setTodo('');
      setPriority('Low');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id) => {
    if (editName.trim() === '' || editTodo.trim() === '') {
      alert('Name and Task are required');
      return;
    }
    try {
      await axios.put(`http://localhost:3001/todos/${id}`, { name: editName, todo: editTodo, priority: editPriority });
      setEditTodoId(null);
      setEditName('');
      setEditTodo('');
      setEditPriority('Low');
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEditClick = (todo) => {
    setEditTodoId(todo.id);
    setEditName(todo.name);
    setEditTodo(todo.todo);
    setEditPriority(todo.priority || 'Low');
  };

  const handleSearchChange = (event) => {
    setSearchInquire(event.target.value);
  };

  const filteredTodos = todos.filter((data) =>
    data.todo.toLowerCase().includes(searchInquire.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red'; 
      case 'Medium':
        return 'orange'; 
      case 'Low':
      default:
        return 'green'; 
    }
  };

  return (
    <>
      <button className='onlogout' onClick={onLogout}>Logout</button>
      <div className="todo-container">
        <h1>TodoList</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="todo-input"
        />

        <input
          type="text"
          placeholder="Task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="todo-input"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="todo-input"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={addTodo} className="add-button">Add</button>

        <h2>Search Todo</h2>
        <input
          type="search"
          placeholder="Search here"
          value={searchInquire}
          onChange={handleSearchChange}
          className="search-input"
        />

        <table className='todo-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id}>
                {editTodoId === todo.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => updateTodo(todo.id)} className='edit-button'>Update</button>
                      <button onClick={() => {
                        setEditTodoId(null);
                        setEditName('');
                        setEditTodo('');
                        setEditPriority('Low');
                      }} className='edit-button'>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{todo.name}</td>
                    <td>{todo.todo}</td>
                    <td style={{ backgroundColor: getPriorityColor(todo.priority) }}>
                      {todo.priority}
                    </td>
                    <td>
                      <button onClick={() => handleEditClick(todo)} className='edit-button'>Edit</button>
                      <button onClick={() => deleteTodo(todo.id)} className='edit-button'>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
