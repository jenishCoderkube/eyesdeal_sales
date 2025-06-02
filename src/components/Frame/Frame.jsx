import React from "react";
import TopBarGlasses from "./TopBarGlasses";
import GlassesCard from "./GlassesCard";
import { useNavigate } from "react-router-dom";

const Frame = () => {
  const navigate = useNavigate();

  // Dummy data for 10 cards
  const glassesData = [
    {
      id: 1,
      title: "Classic Wayfarer",
      price: "1200 ₹",
      brand: "Ray-Ban",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "/glass_1.png",
    },
    {
      id: 2,
      title: "Aviator Elite",
      price: "1500 ₹",
      brand: "Oakley",
      frameType: "Half Rim",
      material: "Metal",
      imageUrl: "/glass_2.png",
    },
    {
      id: 3,
      title: "Sleek Vision",
      price: "900 ₹",
      brand: "Gucci",
      frameType: "Rimless",
      material: "Titanium",
      imageUrl: "/glass_3.png",
    },
    {
      id: 4,
      title: "Bold Explorer",
      price: "1300 ₹",
      brand: "Prada",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "glass_4.png",
    },
    {
      id: 5,
      title: "Modern Classic",
      price: "1100 ₹",
      brand: "Versace",
      frameType: "Half Rim",
      material: "Metal",
      imageUrl: "/glass_1.png",
    },
    {
      id: 6,
      title: "Urban Edge",
      price: "1400 ₹",
      brand: "Ray-Ban",
      frameType: "Rimless",
      material: "Titanium",
      imageUrl: "/glass_2.png",
    },
    {
      id: 7,
      title: "Chic Voyager",
      price: "1600 ₹",
      brand: "Oakley",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "/glass_3.png",
    },
    {
      id: 8,
      title: "Timeless Style",
      price: "1000 ₹",
      brand: "Gucci",
      frameType: "Half Rim",
      material: "Metal",
      imageUrl: "/glass_4.png",
    },
    {
      id: 9,
      title: "Elegant Frame",
      price: "1250 ₹",
      brand: "Prada",
      frameType: "Rimless",
      material: "Titanium",
      imageUrl: "/glass_1.png",
    },
    {
      id: 10,
      title: "Sporty Vision",
      price: "1350 ₹",
      brand: "Versace",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "/glass_2.png",
    },
  ];

  return (
    <div className="px-5 py-5">
      <div>
        <h1 className="font-poppins font-medium text-[24px] leading-[24px] tracking-[0] text-black w-fit pt-5">
          Select Frames
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
          {glassesData.map((glass) => (
            <GlassesCard
              key={glass.id}
              title={glass.title}
              price={glass.price}
              imageUrl={glass.imageUrl}
              active={true}
              onClick={() =>
                navigate(`/frame/details/${glass.id}`, { state: { glass } })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Frame;
