import styles from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operation.js";
import { useState } from "react";
import DeleteContactModal from "../DeleteContactModal";
import toast from "react-hot-toast";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = () => setModalOpen(true);

  const confirmDelete = () => {
    dispatch(deleteContact(id));
    toast.success("Kişi başarıyla silindi!");
    setModalOpen(false);
  };

  return (
    <div className={styles.contactCard}>
      <div className={styles.info}>
        <div className={styles.row}>
          <FaUser className={styles.icon} /> {name}
        </div>
        <div className={styles.row}>
          <FaPhone className={styles.icon} /> {number}
        </div>
      </div>

      <button onClick={handleDeleteClick}>Delete</button>

      <DeleteContactModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleConfirm={confirmDelete}
      />
    </div>
  );
};

export default Contact;
