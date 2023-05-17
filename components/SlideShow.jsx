import { Carousel } from "flowbite-react";
import React from "react";

const SlideShow = ({ images }) => {
  return images?.length === 0 ? (
    <div className="flex flex-row justify-center items-center">
      <h2 className="font-bold">No images available.</h2>
    </div>
  ) : (
    <div className="my-16 w-11/12 aspect-video mx-auto">
      <Carousel indicators={false} slide={false}>
        {images?.map((image, index) => (
          <img src={image} key={index} alt="launch picture" />
        ))}
      </Carousel>
    </div>
  );
};

export default SlideShow;
