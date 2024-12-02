import Button from '@mui/material/Button';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';

const ClientsButton = (props) => {
  const {
    setSortBy,
  } = props;

  const handleClientListButton = () => {
    setSortBy('ClientList');
  }

  return (
    <Button
      className='dashboard-nav-btns'
      endIcon={<PeopleOutlineRoundedIcon />}
      onClick={handleClientListButton}
    >
      Clients
    </Button>
  );
};

export default ClientsButton;