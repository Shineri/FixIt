import React from 'react';
import Slider from 'react-slick';
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const images = [
   "/images/complain1.jpg",
    "/images/complain2.jpg",
    "/images/complain3.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Main content section */}
      <div className="flex flex-col items-center flex-grow py-12 px-6 text-black">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-8xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>FIXIT</h1>
          <p className="text-lg mb-4">
            Your one-stop solution for all repair needs. We fix it all!
          </p>
          <p className="text-lg mb-4">
            Fast, Reliable, Affordable.
          </p>
        </div>

        {/* Image Slider */}
        <div className="w-full">
          <Slider {...settings}>
            {images.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Slide ${index + 1}`} className="h-96 w-full object-cover rounded-lg shadow-lg" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
