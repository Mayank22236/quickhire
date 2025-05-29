import TimeTrackingForm from '../components/TimeTrackingForm';
import TimeEntryList from '../components/TimeEntryList';

function TimeTrackingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Time Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeTrackingForm />
        <TimeEntryList />
      </div>
    </div>
  );
}

export default TimeTrackingPage; 