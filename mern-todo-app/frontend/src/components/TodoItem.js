import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#7bed9f';
      default: return '#7bed9f';
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header">
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
          />
        </div>

        <div className="todo-priority">
          <span
            className="priority-indicator"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
          ></span>
        </div>

        <div className="todo-actions">
          {!isEditing && (
            <>
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                title="Edit todo"
              >
                ✏️
              </button>
              <button
                className="delete-btn"
                onClick={handleDelete}
                title="Delete todo"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>

      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Todo title"
              className="edit-title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description (optional)"
              className="edit-description"
              rows="2"
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <div className="todo-meta">
              <span className={`priority-badge priority-${todo.priority}`}>
                {todo.priority}
              </span>
              <span className="todo-date">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
