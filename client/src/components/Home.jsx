import BookingCard from "./HomeComponents/BookingCard";
import PhotoGallery from "./HomeComponents/PhotoGallery"
import '../styles/Home.scss'

const Home = (props) => {
  const { shopInfo, loading } = props

  return (
    <section id="Home">
      {loading ?
        <div className="loading-icon">
          loading..
        </div>
        :
        <BookingCard shopInfo={shopInfo} />
      }
      <PhotoGallery />
    </section>
  );
};

export default Home;