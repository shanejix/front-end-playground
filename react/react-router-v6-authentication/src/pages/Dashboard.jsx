import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};

export default Dashboard;