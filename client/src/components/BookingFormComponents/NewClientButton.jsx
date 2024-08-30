import Button from '@mui/material/Button';

const NewClientButton = (props) => {
  const {
    setFormSection
  } = props;

  const handleNewClientButton = () => {
    setFormSection('NewClient')
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