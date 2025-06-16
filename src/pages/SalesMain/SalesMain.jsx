import React from "react";
import EyeCheckupCard from "../../components/SalesMain/EyeCheckupCard";

const SalesMain = () => {
  return (
    <div className="mx-auto">
      <img
        src="/glasses_main_image.png"
        alt="Glasses Main"
        className="w-full h-full object-cover rounded-lg mb-8 hidden lg:block"
      />
      <div className="grid grid-cols-1 gap-y-[80px] lg:grid-cols-2 xl:grid-cols-3 mx-auto justify-items-center lg:mt-32 mt-16 mb-10 lg:max-w-[1400px]">
        <EyeCheckupCard title="Eye Check-up" imgSrc="/check_up_image.jpg" />
        <EyeCheckupCard title="Add Package" imgSrc="/package_image.jpg" />
        <EyeCheckupCard title="Add Sales" imgSrc="/sales_image.jpg" />
      </div>
    </div>
  );
};

export default SalesMain;
