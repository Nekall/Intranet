import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from "./styles.module.scss";

// Helpers
import jwtDecode from "../../helpers/jwtDecode";
import isJwt from "../../helpers/isJwt";

const Navbar = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("__intranet_token");
  let userData;

  if (token) {
    if (isJwt(token) && jwtDecode(token)) {
      userData = jwtDecode(token);
    } else {
      localStorage.removeItem("__intranet_token");
    }
  }

  return (
    <nav className={styles.__navbar}>
      <Link to="/">
        <img className={styles.__logo_react} src={logo} alt="IntraNET Logo" />
      </Link>
      <div className={styles.__links}>
        {token && userData ?
          <>
            <Link className={styles.__link} to="/profile">{userData.firstname} {userData.lastname}</Link>
            <Link className={styles.__link} to="/list">List</Link>
            <button className={styles.__link} onClick={() => {
              localStorage.removeItem("__intranet_token");
              navigate('/login');
            }}>Logout</button>
          </>
          :
          <Link className={styles.__link} to="/login">Login</Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;