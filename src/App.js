import GoogleSignIn from './components/GoogleSignIn';

function App() {
  const handleLogin = (user) => {
    console.log('Користувач увійшов:', user.email);
  };

  return (
    <div>
      <h1>AgroProsper</h1>
      <GoogleSignIn onLogin={handleLogin} />
    </div>
  );
}
