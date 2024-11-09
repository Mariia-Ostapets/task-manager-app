import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  closeModal,
  closeEditModal,
} from "../../redux/contacts/slice";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import { Toaster } from "react-hot-toast";
import Contact from "../Contact/Contact";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import EditContactModal from "../EditContactModal/EditContactModal";
import css from "./ContactList.module.css";

export default function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.contacts.isModalOpen);

  const contactIdToDelete = useSelector(
    (state) => state.contacts.contactIdToDelete
  );

  const isEditModalOpen = useSelector(
    (state) => state.contacts.isEditModalOpen
  );

  const handleDeleteClick = (contactId) => {
    if (isEditModalOpen) {
      dispatch(closeEditModal());
    }
    if (!isModalOpen) {
      dispatch(openModal(contactId));
    }
  };

  const confirmDelete = () => {
    dispatch(deleteContact(contactIdToDelete));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <ul className={css.contactList}>
        {visibleContacts.map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} onDeleteClick={handleDeleteClick} />
          </li>
        ))}
      </ul>
      <ConfirmModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={confirmDelete}
      />
      <Toaster />
      <EditContactModal />
    </>
  );
}
