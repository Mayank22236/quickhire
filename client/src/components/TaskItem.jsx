import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

function TaskItem({ task }) {
  const { updateTask, deleteTask, loading } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTask(task._id, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateTask(task._id, { title, description, status });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:bg-blue-400"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => handleStatusChange('pending')}
            className={`px-3 py-1 rounded-md text-sm ${
              task.status === 'pending' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusChange('in-progress')}
            className={`px-3 py-1 rounded-md text-sm ${
              task.status === 'in-progress' ? 'bg-yellow-200' : 'bg-yellow-100 hover:bg-yellow-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            className={`px-3 py-1 rounded-md text-sm ${
              task.status === 'completed' ? 'bg-green-200' : 'bg-green-100 hover:bg-green-200'
            }`}
          >
            Completed
          </button>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem; 