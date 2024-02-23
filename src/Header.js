import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('https://blog-app-mern-back-dri3.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [setUserInfo]);

  function logout() {
    fetch("https://blog-app-mern-back-dri3.onrender.com/logout", {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
      navigate('/login');
    }).catch(error => {
      console.log('Logout failed', error)
    })
  };
  

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center mb-7 mt-5">
      <Link to="/" className="text-inherit font-bold text-3xl">
        My Blog
      </Link>
      <nav className="flex gap-4">
        {username && (
          <>
            <Link to={'/create'}>Create New Post</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
