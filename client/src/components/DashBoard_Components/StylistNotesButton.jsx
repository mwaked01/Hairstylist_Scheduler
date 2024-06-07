import '../../styles/StylistNotesButton.scss'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';

const StylistNotesButton = (props) => {
  const {
    setSortBy,
    setCurrentDate
  } = props;

  const handleAddButton = () => {
    console.log('add comment')
  }

  return (
    <div className='add-btn'>
      {<AddCommentRoundedIcon
        onClick={handleAddButton}
        sx={{ padding: '0.1em' }}
      />}
    </div>
  );
};

export default StylistNotesButton;