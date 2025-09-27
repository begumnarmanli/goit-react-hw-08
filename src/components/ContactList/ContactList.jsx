import Contact from "../Contact/Contact.jsx";
import styles from "./ContactList.module.css";
import { useSelector } from "react-redux";

const ContactList = ({ filter }) => {
  const contacts = useSelector((state) => state.contacts.items);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <ul className={styles.list}>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          <Contact {...contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
