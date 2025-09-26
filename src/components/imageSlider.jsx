import { useState } from "react";
export default function ImageSlider(props) {
  const images = props.images;
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="w-full aspect-square">
        <img src={images[activeImage]} className="w-full h-full object-cover" />
      </div>

      <div className="w-full flex items-center justify-center mt-4">
        <div className="flex items-center justify-start overflow-x-auto gap-2 p-2">
          {images.map((image, index) => (
            <img
              onClick={() => {
                setActiveImage(index);
              }}
              key={index}
              src={image}
              className="w-16 h-16 object-cover cursor-pointer rounded-md ring-1 ring-pink-200 hover:ring-pink-400 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
