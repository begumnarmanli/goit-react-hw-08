import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <h1
        className={`${styles.title} ${
          animate ? styles.slideInLeft1 : styles.hidden
        }`}
      >
        Welcome to Your Digital Phonebook
      </h1>
      <p
        className={`${styles.text} ${
          animate ? styles.slideInRight1 : styles.hidden
        }`}
      >
        Keep all your important contacts safe, organized, and accessible
        anytime.
      </p>
      <p
        className={`${styles.text} ${
          animate ? styles.slideInLeft2 : styles.hidden
        }`}
      >
        Add, search, and manage your contacts with ease.
      </p>
      <p
        className={`${styles.text} ${
          animate ? styles.slideInRight2 : styles.hidden
        }`}
      >
        Please{" "}
        <span
          onClick={() => navigate("/register")}
          className={styles.link}
          style={{ cursor: "pointer" }}
        >
          Register
        </span>{" "}
        or{" "}
        <span
          onClick={() => navigate("/login")}
          className={styles.link}
          style={{ cursor: "pointer" }}
        >
          Login
        </span>{" "}
        to get started!
      </p>
    </div>
  );
};

export default HomePage;
