import { Divider, Skeleton } from "@mui/material";

const ServicePicker = (props) => {
  const { setFormSection, shopInfo, setService, setClient, loading } = props;

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
      {loading ?
        <div className="loading-skeleton" style={{ width: "90%" }}>
          <Divider />
          <Skeleton />
          <Divider />
          <Skeleton />
          <Skeleton variant="rectangular" height="30vh" animation="wave" />
        </div>
        :
        <section id='service-list'>
          {shopInfo.services.map(({ name, cost, duration, _id }) => (
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
      }

    </div>
  );
};

export default ServicePicker;
