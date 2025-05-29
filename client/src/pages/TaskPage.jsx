import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

function TaskPage() {
  const { tasks, fetchTasks, loading, error } = useAppContext();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Task Management</h1>
      
      <TaskForm onSuccess={fetchTasks} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading && tasks.length === 0 ? (
        <div className="text-center py-6">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No tasks found. Add your first task to get started!</p>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Your Tasks ({tasks.length})</h2>
          </div>
          {tasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskPage; 