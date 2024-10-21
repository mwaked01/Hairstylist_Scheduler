import { useState, useEffect } from "react";
import axios from 'axios';

import BookingCard from "./HomeComponents/BookingCard";
import PhotoGallery from "./HomeComponents/PhotoGallery"
import '../styles/Home.scss'


const Home = () => {
  const [shopInfo, setShopInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalonInfo();
  }, []);

  const fetchSalonInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/salonInfo');
      setShopInfo(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients info', error);
      setLoading(false);
    }
  }

  return (
    <section id="Home">
      {loading ?
        <div className="loading-icon">
          loading..    </div>
        : <BookingCard shopInfo={shopInfo} />
      }
      <PhotoGallery />
    </section>
  );
};

export default Home;