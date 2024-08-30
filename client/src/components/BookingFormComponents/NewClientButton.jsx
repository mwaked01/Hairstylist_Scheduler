import Button from '@mui/material/Button';

const NewClientButton = (props) => {
  const {

  } = props;

  const handleNewClientButton = () => {

  }

  return (
    <Button
      className='NewClientButton'
      variant='contained'
      onClick={handleNewClientButton}
    >
      New Client
    </Button>
  );
};

export default NewClientButton;