import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

function StatsDisplay() {
  const { stats, fetchStats, loading } = useAppContext();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading || !stats) {
    return <div className="text-center py-6">Loading statistics...</div>;
  }

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completed / stats.totalTasks) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Your Productivity Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-blue-500 text-4xl font-bold mb-2">{stats.totalTasks}</div>
          <div className="text-blue-700 font-medium">Total Tasks</div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="text-green-500 text-4xl font-bold mb-2">{stats.completed}</div>
          <div className="text-green-700 font-medium">Completed</div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <div className="text-purple-500 text-4xl font-bold mb-2">{formatTime(stats.timeSpent)}</div>
          <div className="text-purple-700 font-medium">Total Time Tracked</div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Task Completion Rate</h3>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div 
            className="bg-green-600 h-6 rounded-full text-center text-white text-sm leading-6"
            style={{ width: `${completionRate}%` }}
          >
            {completionRate}%
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Productivity Insights</h3>
        {stats.totalTasks === 0 ? (
          <p className="text-gray-500">
            Start creating tasks to get productivity insights!
          </p>
        ) : (
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Completion Rate:</span> You've completed {completionRate}% of your tasks.
              {completionRate < 30 && " Try breaking down your tasks into smaller, manageable pieces."}
              {completionRate >= 30 && completionRate < 70 && " You're making good progress!"}
              {completionRate >= 70 && " Great job staying on top of your tasks!"}
            </li>
            <li>
              <span className="font-medium">Time Tracking:</span> You've tracked a total of {formatTime(stats.timeSpent)} on your tasks.
              {stats.timeSpent === 0 && " Start tracking time to get insights into your productivity patterns."}
            </li>
            {stats.completed > 0 && (
              <li>
                <span className="font-medium">Average Time per Task:</span> {formatTime(Math.round(stats.timeSpent / stats.completed))} per completed task.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StatsDisplay; 