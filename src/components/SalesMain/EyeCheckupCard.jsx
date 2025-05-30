import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import "../../assets/css/EyeCheckupCard.css";
import { useNavigate } from "react-router-dom";

const EyeCheckupCard = ({ title = "Eye Check-up", imgSrc, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/sales-panel");
  };
  return (
    <div className="eye-checkup-card" onClick={handleClick}>
      <div className="card-content">
        <h2 className="card-title w-[135px]">{title}</h2>
        <p className="card-arrow">
          <FaArrowRightLong size={20} />
        </p>
      </div>
      <img src={imgSrc} alt={title} className="card-image" />
    </div>
  );
};

export default EyeCheckupCard;
