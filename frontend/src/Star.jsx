import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" style={{ color: "yellow", fontWeight: "bold" }} />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" style={{ color: "yellow", fontWeight: "bold" }} />
        ) : (
          <AiOutlineStar className="icon" style={{ color: "yellow", fontWeight: "bold" }} />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        {ratingStar}
      </div>
      <p className="text-gray-500 text-sm ml-2">({reviews} customer reviews)</p>
    </div>
  );
};

export default Star;
