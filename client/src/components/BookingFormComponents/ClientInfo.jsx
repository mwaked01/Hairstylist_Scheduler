import '../../styles/ClientInfo.scss'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import NewClientButton from './NewClientButton';
import ReturningClientButton from './ReturningClientButton';

const ClientInfo = (props) => {
  const { client, setClient, handleSubmit, setFormSection, formSection, appointmentDate, service } = props;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const services = [
    ['Hair Cut', 30],  // 30 minutes for Hair Cut
    ['Color', 60],     // 60 minutes for Color
    ['Style', 45]      // 45 minutes for Style
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prevClient => ({
      ...prevClient,
      [name]: value
    }));
  };

  return (
    <div id='client-info'>
      <header>
        <IconButton onClick={() => { setFormSection('Time') }} type="button" className='back-btn' aria-label="search">
          <ArrowBackIosNewIcon fontSize='small' />
          Time
        </IconButton>
        <h2 className='date' name='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year} at {appointmentDate.time}</h2>
      </header>

      {formSection === 'ReturningClient' ?
        <div id='ReturningClient'>
          <NewClientButton setFormSection={setFormSection} />
          <form id='returning-client-search-bar'>
            <TextField
              // onInput={(e) => {
              //   setSearchQuery(e.target.value);
              // }}
              label="Enter an Email or a Phone Number..."
              variant="outlined"
              placeholder="Search..."
              size="small"
              fullWidth
            />
            <IconButton type="submit" aria-label=" search">
              <PersonSearchOutlinedIcon />
            </IconButton>
          </form>
        </div>
        :
        <form onSubmit={handleSubmit} id='NewClient'>
          <ReturningClientButton setFormSection={setFormSection} />

          <input type="hidden" name="date" value={`${appointmentDate.year}-${appointmentDate.month}-${appointmentDate.day}`} />
          <input type="hidden" name="time" value={appointmentDate.time} />
          <input type="hidden" name="service" value={service} />

          <div className='client-form-input'>
            <section >
              <div className='input'>
                <TextField
                  required
                  id="first-name"
                  label="First Name"
                  variant="filled"
                  name="firstName"
                  value={client.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className='input'>
                <TextField
                  required
                  id="email"
                  label="Email"
                  variant="filled"
                  name="email"
                  value={client.email}
                  onChange={handleChange}
                />
              </div>
            </section>

            <section >
              <div className='input-right'>
                <TextField
                  required
                  id="last-name"
                  label="Last Name"
                  variant="filled"
                  name="lastName"
                  value={client.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className='input-right'>
                <TextField
                  required
                  id="phone"
                  label="Phone Number"
                  variant="filled"
                  name="phone"
                  value={client.phone}
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>

          <div className='input-right'>
            <TextField
              fullWidth
              id="clientNotes"
              multiline
              rows={4}
              label="Additional Notes"
              variant="filled"
              name="clientNotes"
              value={client.clientNotes}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </form>
      }
    </div >
  );
};

export default ClientInfo;
