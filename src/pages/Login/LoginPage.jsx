import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operation.js";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too short").required("Required"),
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await dispatch(logIn(values)).unwrap();
            navigate("/contacts");
            setLoginError("");
          } catch {
            setLoginError("Invalid email or password");
          }
        }}
      >
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>
          {loginError && <div className={styles.error}>{loginError}</div>}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
