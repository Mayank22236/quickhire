import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../context/AppContext';

function TimeTrackingForm() {
  const { tasks, fetchTasks, addTimeEntry, loading } = useAppContext();
  const [selectedTask, setSelectedTask] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTracking = () => {
    if (!selectedTask) return;
    
    setIsTracking(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    setTimer(interval);
  };

  const stopTracking = async () => {
    if (timer) clearInterval(timer);
    setIsTracking(false);
    
    if (elapsedTime > 0 && selectedTask) {
      try {
        await addTimeEntry({
          taskId: selectedTask,
          duration: elapsedTime,
          date: new Date()
        });
        reset();
        setSelectedTask('');
        setElapsedTime(0);
      } catch (error) {
        console.error('Failed to save time entry:', error);
      }
    }
  };

  const handleManualSubmit = async (data) => {
    const duration = (parseInt(data.hours || 0) * 3600) + 
                     (parseInt(data.minutes || 0) * 60) + 
                     parseInt(data.seconds || 0);
    
    if (duration > 0 && data.taskId) {
      try {
        await addTimeEntry({
          taskId: data.taskId,
          duration,
          date: new Date()
        });
        reset();
      } catch (error) {
        console.error('Failed to save manual time entry:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Track Time</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Live Tracking</h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select Task</label>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            disabled={isTracking}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a task</option>
            {tasks.map(task => (
              <option key={task._id} value={task._id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-4xl font-mono font-bold mb-4">
            {formatTime(elapsedTime)}
          </div>
          
          <div className="flex justify-center space-x-4">
            {!isTracking ? (
              <button
                onClick={startTracking}
                disabled={!selectedTask}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md disabled:bg-gray-400"
              >
                Start
              </button>
            ) : (
              <button
                onClick={stopTracking}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
              >
                Stop
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Manual Entry</h3>
        <form onSubmit={handleSubmit(handleManualSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Select Task</label>
            <select
              {...register('taskId', { required: 'Please select a task' })}
              className={`w-full px-3 py-2 border rounded-md ${errors.taskId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a task</option>
              {tasks.map(task => (
                <option key={task._id} value={task._id}>
                  {task.title}
                </option>
              ))}
            </select>
            {errors.taskId && (
              <p className="text-red-500 text-sm mt-1">{errors.taskId.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Hours</label>
              <input
                type="number"
                min="0"
                {...register('hours', { min: 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                {...register('minutes', { min: 0, max: 59 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                {...register('seconds', { min: 0, max: 59 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:bg-blue-400"
            >
              {loading ? 'Saving...' : 'Save Time Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimeTrackingForm; 