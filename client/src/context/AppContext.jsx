import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:9000/api';

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new task
  const addTask = useCallback(async (task) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/tasks`, task, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(prevTasks => [...prevTasks, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a task
  const updateTask = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updates, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? response.data : task));
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a task
  const deleteTask = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch time entries
  const fetchTimeEntries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/time`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTimeEntries(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch time entries');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a time entry
  const addTimeEntry = useCallback(async (entry) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/time`, entry, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setTimeEntries(prevEntries => [...prevEntries, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add time entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/stats`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{
      tasks,
      timeEntries,
      stats,
      loading,
      error,
      fetchTasks,
      addTask,
      updateTask,
      deleteTask,
      fetchTimeEntries,
      addTimeEntry,
      fetchStats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; 