import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ServicePicker = (props) => {
  const { setFormSection, appointmentDate, services, setService, setClient } = props;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSelectService = (newService, duration) => {
    setService({ name: newService, duration })
    setClient(prevClient => ({
      ...prevClient,
      ['service']: { name: newService, duration }
    }));
    setFormSection('Date')
  }

  return (
    <div id='service-picker'>
      <header className='Booking-Nav'>
        <IconButton onClick={() => { setFormSection('Date') }} type="button" className='back-btn' aria-label="search">
          <ArrowBackIosNewIcon fontSize='small' />
          Calendar
        </IconButton>
        <div className='date'>{months[appointmentDate.month - 1]} {appointmentDate.day}, {appointmentDate.year}</div>
      </header>
      <section id='service-list'>
        {services.map(({ name, cost, duration, _id }) => (
          <div key={_id} className='service-item' onClick={() => { handleSelectService(name, duration) }}>
            <div>
              {name} - ${cost}
            </div>
            <div>
              ({duration} mins)
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default ServicePicker;
