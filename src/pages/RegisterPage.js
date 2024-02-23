import {useState} from 'react'

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onChangeUsername(event) {
    setUsername(event.target.value);
  };

  function onChangePassword(event) {
    setPassword(event.target.value);
  };

  async function register(event) {
    event.preventDefault();
    
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'}
    }

    const response = await fetch('https://blog-app-mern-back-dri3.onrender.com/register', options)

    if (response.status === 200) {
      alert("Registration Successful")
      setUsername('');
      setPassword('');
    } else {
      alert("Registration Failed")
    }

    
  }

  return (
    <form className="max-w-lg m-auto" onSubmit={register}>
      <h1 className="text-center font-bold text-4xl p-6">Register</h1>
      <input
        className="block mb-1 w-full bg-white border-2 border-gray-400 rounded-md p-2"
        type="text"
        placeholder="username"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        className="block mb-1 w-full bg-white border-2 border-gray-400 rounded-md p-2"
        type="password"
        placeholder="password"
        value={password}
        onChange={onChangePassword}
      />
      <button className="block w-full bg-gray-700 text-white rounded-md p-2">
        Register
      </button>
    </form>
  );
}

export default RegisterPage;
