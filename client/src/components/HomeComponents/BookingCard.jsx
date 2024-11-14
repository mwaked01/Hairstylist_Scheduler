import BookingButton from "./BookingCardComponents/BookingButton";
import ShopInfo from "./BookingCardComponents/ShopInfo";
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';


const BookingCard = (props) => {
  const { shopInfo, loading } = props
  return (
    <div id="BookingCard">
      <BookingButton />
      {loading ?
        <div className="loading-skeleton" style={{ width: "90%" }}>
          <Divider />
          <Skeleton />
          <Divider />
          <Skeleton />
          <Skeleton variant="rectangular" height="30vh" animation="wave" />
        </div>
        :
        <ShopInfo shopInfo={shopInfo} />
      }
    </div>
  );
};

export default BookingCard;
