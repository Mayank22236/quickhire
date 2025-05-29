import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../context/AppContext';

function TaskForm({ onSuccess }) {
  const { addTask, loading } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addTask(data);
      reset();
      setShowForm(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="mb-6">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Task
        </button>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Add New Task</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Title</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Task title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                {...register('description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Task description"
                rows="3"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:bg-blue-400"
              >
                {loading ? 'Saving...' : 'Save Task'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskForm; 