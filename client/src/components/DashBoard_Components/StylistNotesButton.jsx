import { useState } from 'react';
import '../../styles/StylistNotesButton.scss'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setClient(prevClient => ({
  //     ...prevClient,
  //     [name]: value
  //   }));
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('notes submitted')
  };

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
        <form style={style} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="stylistNotes"
            multiline
            rows={10}
            label="Add Notes"
            variant="filled"
            name="stylistNotes"
            // value={client.clientNotes}
            // onChange={handleChange}
          />

          <Button onClick={handleCloseModal} variant="contained" color="error">Cancel </Button>
          <Button type="submit" variant="contained" color="primary"> Submit</Button>
        </form>
      </Modal>
    </div>
  );
};

export default StylistNotesButton;