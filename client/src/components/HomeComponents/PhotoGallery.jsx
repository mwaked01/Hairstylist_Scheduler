import { useState } from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
// import InstagramEmbed from 'react-instagram-embed';

const PhotoGallery = (props) => {
  const [pic, setPic] = useState(1)
  return (
    <div id="PhotoGallery">
      <button onClick={() => { pic > 1 ? setPic(pic - 1) : setPic(3) }}><ArrowCircleLeftIcon/></button>
      <img src={`/insta${pic}.PNG`} alt={`Inspo Pic ${pic}`} />
      <button onClick={() => { pic < 3 ? setPic(pic + 1) : setPic(1) }}><ArrowCircleRightIcon/></button>
    </div>
  );
};

export default PhotoGallery;
