import React from "react";
// import TopBarGlasses from "./TopBarGlasses";
// import GlassesCard from "./SunglassesCard";
import SunglassesCard from "./SunglassesCard";
import { useNavigate } from "react-router-dom";

const Sunglasses = () => {
  const navigate = useNavigate();

  // Dummy data for 10 cards
  const glassesData = [
    {
      id: 1,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Ray-Ban",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "/Sunglasses1.png",
    },
    {
      id: 2,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Oakley",
      frameType: "Half Rim",
      material: "Metal",
      imageUrl: "/Sunglasses2.png",
    },
    {
      id: 3,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Gucci",
      frameType: "Rimless",
      material: "Titanium",
      imageUrl: "/Sunglasses3.png",
    },
    {
      id: 4,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Prada",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "Sunglasses4.png",
    },
    {
      id: 5,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Versace",
      frameType: "Half Rim",
      material: "Metal",
      imageUrl: "/Sunglasses1.png",
    },
    {
      id: 6,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Ray-Ban",
      frameType: "Rimless",
      material: "Titanium",
      imageUrl: "/Sunglasses2.png",
    },
    {
      id: 7,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Oakley",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "/Sunglasses3.png",
    },
    {
      id: 8,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Gucci",
      frameType: "Half Rim",
      material: "Metal",
      imageUrl: "/Sunglasses4.png",
    },
    {
      id: 9,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Prada",
      frameType: "Rimless",
      material: "Titanium",
      imageUrl: "/Sunglasses1.png",
    },
    {
      id: 10,
      title: "I-GOG Glasses",
      price: "800 ₹",
      brand: "Versace",
      frameType: "Full Rim",
      material: "Acetate",
      imageUrl: "/Sunglasses5.png",
    },
  ];

  return (
    <div className="px-5 py-5">
      <div>
        <h1 className="font-poppins font-medium text-[24px] leading-[24px] tracking-[0] text-black w-fit pt-5">
          Select Sunglasses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
          {glassesData.map((sunglass) => (
            <SunglassesCard
              key={sunglass.id}
              title={sunglass.title}
              price={sunglass.price}
              imageUrl={sunglass.imageUrl}
              active={true}
              onClick={() =>{
                console.log(`sunglass`, sunglass);

                navigate(`/Sunglasses/details/${sunglass.id}`, { state: { sunglass } })
              }
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sunglasses;
