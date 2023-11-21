import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.svg';

// Styles
import styles from "./styles.module.scss";

const Navbar = () => (
  <nav className={styles.__navbar}>
    <Link to="/">
      <img className={styles.__logo_react} src={logo} alt="IntraNET Logo" />
    </Link>
    <div className={styles.__links}>
      <Link className={styles.__link} to="/list">List</Link>
      <Link className={styles.__link} to="/login">Login</Link>
    </div>
  </nav>
);

export default Navbar;