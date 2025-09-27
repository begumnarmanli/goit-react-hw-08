import { Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing, selectToken } from "../../redux/auth/selectors";
import { refreshUser, setAuthHeader } from "../../redux/auth/operation";
import { fetchContacts } from "../../redux/contacts/operation";
import Layout from "../Layout/Layout";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
import { Suspense } from "react";

const HomePage = lazy(() => import("../../pages/Home/HomePage"));
const ContactsPage = lazy(() => import("../../pages/Contact/ContactsPage"));
const LoginPage = lazy(() => import("../../pages/Login/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/Registration/RegistrationPage")
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    console.log("Local token:", localToken);
    if (localToken) {
      setAuthHeader(localToken);
    }
    dispatch(refreshUser())
      .then((result) => {
        console.log("Refresh user result:", result);
      })
      .catch((error) => {
        console.log("Refresh user error:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
      dispatch(fetchContacts());
    }
  }, [token, dispatch]);

  console.log("isRefreshing:", isRefreshing);

  return isRefreshing ? (
    <b>Loading...</b>
  ) : (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />

          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
