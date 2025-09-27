import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectError } from "../../redux/contacts/selector.js";
import { fetchContacts } from "../../redux/contacts/operation.js";
import ContactsForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import styles from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Contacts</h1>

      <ContactsForm />

      <input
        type="text"
        placeholder="Search contacts..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.searchInput}
      />

      {isLoading && !error && <p>Loading...</p>}
      {error && <p>Oops, something went wrong...</p>}

      <ContactList filter={filter} />
    </div>
  );
}
