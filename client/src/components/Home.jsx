import BookingCard from "./HomeComponents/BookingCard";
import PhotoGallery from "./HomeComponents/PhotoGallery"
import '../styles/Home.scss'

const Home = (props) => {
  const { shopInfo, loading } = props

  return (
    <section id="Home">
      <BookingCard shopInfo={shopInfo} loading={loading}/>
      <PhotoGallery />
    </section>
  );
};

export default Home;