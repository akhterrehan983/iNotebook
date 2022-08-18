import React from 'react'
import {useNavigate} from 'react-router-dom';
import {
    Link,
    useLocation
  } from "react-router-dom";
  const Navbar = () => {
    const navigate = useNavigate();
    let location = useLocation();
    React.useEffect(() => {
      console.log(location)
    }, [location]);
    // localStorage.setItem("authToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3MzJlN2EwZTczODIyMjJlMmEzYmU2In0sImlhdCI6MTY1MTkzMjI4M30.J1efplaE5mVkYb7jiMZxsVEH9e1Tx4g9uJx5nvWQZk4")
    const logout = () => {
        localStorage.removeItem("authToken")
        navigate('/login');
        
    // localStorage.removeItem('authToken');
    }
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">iNotebook</Link>
                            </li>
                            <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`}  aria-current="page" to="about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/contact"?"active":""}`} to="contact">Contact</Link>
                            </li>
                          
                         
                        </ul>
                        {!localStorage.getItem('authToken')?
                        (
                        <>
                        <Link className="btn btn-outline-primary mx-1" to="login">Login</Link>
                        <Link className="btn btn-outline-secondary mx-1" to="signup">Signup</Link>
                        </>
                        ):
                        (
                            <>
                            <button className="btn btn-outline-danger mx-1" onClick={logout}>logout</button>
                            </>
                        )
                        }
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
        
    )
}

export default Navbar

