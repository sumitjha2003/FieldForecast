import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { MdExitToApp } from "react-icons/md";
import '../util/config';

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();

  const Logout = () => {
    removeCookie("token");
    window.config.resetId();
    window.config.resetName();
    Cookies.remove('id');
    Cookies.remove('token');
    Cookies.remove('username');
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
        backgroundColor: "#fff", 
        boxShadow: "0 5px 4px rgba(0, 0, 0, 0.1)"
      }}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="d-flex justify-content-between w-100">
              <a className="navbar-brand d-flex align-items-center" href="/">
                <img src="/sprout.svg" alt="Logo" width="30" height="30" className="me-2" />
                FieldForecast
              </a>
              <ul className="navbar-nav d-flex flex-row justify-content-around w-50">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/update">
                    Update
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/forum">
                    Forum
                  </a>
                </li>
              </ul>
              <button onClick={Logout} className="btn btn-outline-transparent d-flex align-items-center">
                <MdExitToApp /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
