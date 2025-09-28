import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={`${css.link} ${location.pathname === "/" ? css.active : ""}`}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={`${css.link} ${
            location.pathname === "/contacts" ? css.active : ""
          }`}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
