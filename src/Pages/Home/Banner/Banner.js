import React from "react";
import ban1 from "../../../assets/images/banner/1.jpg";
import ban2 from "../../../assets/images/banner/2.jpg";
import ban3 from "../../../assets/images/banner/3.jpg";
import ban4 from "../../../assets/images/banner/4.jpg";
import BannerItem from "./BannerItem";
const bannerData = [
  {
    image: ban1,
    prev: 4,
    id: 1,
    next: 2,
  },
  {
    image: ban2,
    prev: 1,
    id: 2,
    next: 3,
  },
  {
    image: ban3,
    prev: 2,
    id: 3,
    next: 4,
  },
  {
    image: ban4,
    prev: 3,
    id: 4,
    next: 1,
  },
];
const Banner = () => {
  return (
    <div className="carousel w-full py-10">
      {bannerData.map((slide) => (
        <BannerItem key={slide.id} slide={slide}></BannerItem>
      ))}
    </div>
  );
};

export default Banner;
