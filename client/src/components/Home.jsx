import BookingCard from "./HomeComponents/BookingCard";
import PhotoGallery from "./HomeComponents/PhotoGallery"
import '../styles/Home.scss'


const Home = (props) => {


  return (
    <section id="Home">
      <BookingCard />
      {/* <PhotoGallery/> */}
    </section>
  );
};

export default Home;