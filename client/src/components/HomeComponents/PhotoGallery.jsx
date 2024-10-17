import { useState } from "react";

// import InstagramEmbed from 'react-instagram-embed';

const PhotoGallery = (props) => {
const [pic,setPic] = useState(1)
  return (
    <div>
    <button onClick={()=>{pic >1?setPic(pic-1):setPic(3)}}>Prev</button>
    <button onClick={()=>{pic <3?setPic(pic+1):setPic(1)}}>Next</button>
    <img src={`/insta${pic}.PNG`} alt={`Inspo Pic ${pic}`}/>
    </div>
  );
};

export default PhotoGallery;
