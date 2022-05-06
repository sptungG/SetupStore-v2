import { Carousel } from "antd";
import React from "react";

const IMAGES = [
  "https://firebasestorage.googleapis.com/v0/b/setup-store-v2.appspot.com/o/setup.png?alt=media&token=7d84ab8d-9d3f-4f9f-ae23-af334834f7d7",
  "https://firebasestorage.googleapis.com/v0/b/setup-store-v2.appspot.com/o/setup1.png?alt=media&token=6dbf3142-2828-421a-b277-1c672e3f3aa3",
  "https://firebasestorage.googleapis.com/v0/b/setup-store-v2.appspot.com/o/setup2.png?alt=media&token=a8f21a91-7238-41c8-9db0-3f9927ef0a5c",
  "https://firebasestorage.googleapis.com/v0/b/setup-store-v2.appspot.com/o/setup3.png?alt=media&token=047b5683-eb81-40f4-8d00-51398c38c2a0",
];

const CarouselGallery = ({ size = 120 }) => {
  return (
    <Carousel autoplay speed={3600} dots={false} dotPosition="bottom" easing="ease-in" effect="scrollx" pauseOnHover={false}>
      {IMAGES.map((item, index) => (
        <div key={index+1} style={{ width: size, height: size }}>
          <img
            alt={index}
            src={item}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselGallery;
