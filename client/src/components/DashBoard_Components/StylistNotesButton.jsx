import { useState } from 'react';
import '../../styles/StylistNotesButton.scss'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StylistNotesButton = (props) => {
  const {
    setSortBy,
    setCurrentDate
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className='add-btn'>
      <AddCommentRoundedIcon
        onClick={handleOpenModal}
        sx={{ padding: '0.1em' }}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <div style={style}>
          <h2>Add a Note</h2>
          <p>Here you can add a new note.</p>
          {/* Add your form or other elements here */}
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default StylistNotesButton;