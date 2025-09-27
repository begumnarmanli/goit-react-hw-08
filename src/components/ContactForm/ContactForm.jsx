import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operation.js";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
  number: Yup.string()
    .matches(/\d{3}-\d{2}-\d{2}/, "Format: 123-45-67")
    .required("Required"),
});
const ContactForm = () => {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={ContactSchema}
      onSubmit={(values, { resetForm }) => {
        const newContact = {
          name: values.name,
          number: values.number,
        };
        dispatch(addContact(newContact));
        resetForm();
      }}
    >
      <Form className={styles.form}>
        <label htmlFor={nameId} className={styles.label}>
          Name
        </label>
        <Field id={nameId} name="name" type="text" className={styles.input} />
        <ErrorMessage
          name="name"
          component="div"
          className={styles.ErrorMessage}
        />

        <label htmlFor={numberId} className={styles.label}>
          Number
        </label>
        <Field
          id={numberId}
          name="number"
          type="text"
          className={styles.input}
        />
        <ErrorMessage
          name="number"
          component="div"
          className={styles.ErrorMessage}
        />

        <div>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
