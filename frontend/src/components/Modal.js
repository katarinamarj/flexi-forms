import "../styles/Modal.css";
import { IoClose } from "react-icons/io5";

const Modal = ({ publicLink, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="icon-close-button" onClick={onClose}>
          <IoClose size={30} />
        </button>
        <h3>Form is succesfully created! <br/> You can share it using the link below:</h3>
        <a href={publicLink} target="_blank" rel="noopener noreferrer">
          {publicLink}
        </a>
      </div>
    </div>
  );
};

export default Modal;
