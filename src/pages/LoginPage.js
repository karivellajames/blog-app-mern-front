import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  function onChangeUsername(event) {
    setUsername(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  async function login(event) {
    event.preventDefault();

    const options = {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }

    const response = await fetch("https://blog-app-mern-back-dri3.onrender.com/login", options);

    if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo)
          setRedirect(true)
        })  
    } else {
        alert('Wrong Credentials')
    }
    
}

if (redirect) {
    return <Navigate to={'/'} />
}


  return (
    <form className="max-w-lg m-auto" onSubmit={login}>
      <h1 className="text-center font-bold text-4xl p-6">Login</h1>
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
        Login
      </button>
    </form>
  );
}

export default LoginPage;
