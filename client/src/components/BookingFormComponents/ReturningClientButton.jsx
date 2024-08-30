import Button from '@mui/material/Button';

const ReturningClientButton = (props) => {
  const {
    setFormSection
  } = props;

  const handleReturningClientButton = () => {
    setFormSection('ReturningClient')
  }

  return (
    <Button
      id='ReturningClientButton'
      onClick={handleReturningClientButton}
      variant='outlined'
    >
      Returning Client
    </Button>
  );
};

export default ReturningClientButton;