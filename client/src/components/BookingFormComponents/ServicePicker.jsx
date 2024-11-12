const ServicePicker = (props) => {
  const { setFormSection, services, setService, setClient } = props;

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
