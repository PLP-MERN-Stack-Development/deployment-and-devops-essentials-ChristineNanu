import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { todoAPI } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoAPI.getTodos();
      setTodos(response.data);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      setTodos(prevTodos => [response.data, ...prevTodos]);
    } catch (err) {
      throw new Error('Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id, updateData) => {
    try {
      const response = await todoAPI.updateTodo(id, updateData);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? response.data : todo
        )
      );
    } catch (err) {
      console.error('Error updating todo:', err);
      alert('Failed to update todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      alert('Failed to delete todo. Please try again.');
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>MERN Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        <div className="todo-container">
          <TodoForm onAdd={handleAddTodo} />

          <div className="todo-stats">
            <div className="stats-item">
              <span className="stats-number">{activeCount}</span>
              <span className="stats-label">Active</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">{completedCount}</span>
              <span className="stats-label">Completed</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">{todos.length}</span>
              <span className="stats-label">Total</span>
            </div>
          </div>

          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({todos.length})
            </button>
            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Active ({activeCount})
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedCount})
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={loadTodos} className="retry-btn">Retry</button>
            </div>
          )}

          <div className="todos-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                {filter === 'all' ? (
                  <>
                    <h3>No todos yet</h3>
                    <p>Add your first todo above to get started!</p>
                  </>
                ) : filter === 'active' ? (
                  <>
                    <h3>No active todos</h3>
                    <p>All caught up! 🎉</p>
                  </>
                ) : (
                  <>
                    <h3>No completed todos</h3>
                    <p>Complete some todos to see them here!</p>
                  </>
                )}
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with MERN Stack - Week 7 Assignment</p>
      </footer>
    </div>
  );
}

export default App;
