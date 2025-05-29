import StatsDisplay from '../components/StatsDisplay';

function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Productivity Statistics</h1>
      <StatsDisplay />
    </div>
  );
}

export default StatsPage; 