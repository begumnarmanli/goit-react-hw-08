import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export default function AuthNav() {
  const getLinkClass = ({ isActive }) => {
    return isActive ? `${styles.link} ${styles.active}` : styles.link;
  };
  return (
    <div className={styles.nav}>
      <NavLink to="/register" className={getLinkClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={getLinkClass}>
        Login
      </NavLink>
    </div>
  );
}
