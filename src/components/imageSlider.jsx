import { useState } from "react";
export default function ImageSlider(props) {
  const images = props.images;
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full  flex items-center justify-center flex-col relative aspect-square ">
      <img
        src={images[activeImage]}
        className="w-full aspect-square object-cover"
      />

      <div className="absolute bottom-0 w-full h-[75px] backdrop-blur-md flex items-center ">
        <div className="flex items-center justify-start overflow-hidden w-full h-full">
          {images.map((image, index) => (
            <img
              onClick={() => {
                setActiveImage(index);
              }}
              key={index}
              src={image}
              className="w-[75px] h-[75px] object-cover cursor-pointer m-2 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
