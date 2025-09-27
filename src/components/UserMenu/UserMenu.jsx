import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operation";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.userMenu}>
      <p className={styles.welcomeText}>
        Welcome, <span className={styles.email}>{user?.email}</span>
      </p>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
