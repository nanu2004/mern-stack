import React, { useState } from "react";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  // Placeholder images
  const placeholderImages = [
    "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1513758173941-bfbd2e4166f5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.istockphoto.com/id/1197204151/photo/close-up-of-eye-and-makeup-stock-photo.jpg?s=612x612&w=is&k=20&c=9_ujFk0wgdvFjJX9km-gvFkcorlzOQ0uyMT0NUlZ5zw=",
    "https://media.istockphoto.com/id/1197204154/photo/close-up-of-eye-and-makeup-stock-photo.jpg?s=612x612&w=is&k=20&c=nXrvHJKEuG993j43y7r5NOWCpLhSN5ZFfWAhlRys9UY=",
  ];

  // State to manage the main image
  const [mainImage, setMainImage] = useState(placeholderImages[0]); // Set the default main image

  // Function to handle click event on a placeholder image
  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl); // Update the main image when a placeholder image is clicked
  };

  return (
    <div className="flex flex-col md:flex-row ml-40 md:mr-20">
      {/* Image grid */}
      <div className="md:w-4/7">
        <div className="grid grid-cols-2 md:grid-cols-1 grid-rows-2 md:grid-rows-4 gap-2 md:gap-4">
          {placeholderImages.map((curElm, index) => (
            <div key={index} className="cursor-pointer">
              <img
                src={curElm}
                alt={`Image ${index}`}
                className="w-full h-full md:w-32 md:h-32 rounded-lg shadow-md"
                onClick={() => handleImageClick(curElm)} // Update main image on click
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main image */}
      <div className="md:w-4/5">
        <div className="flex justify-center items-center h-full ml-10">
          <img
            src={mainImage} // Display selected image
            alt={`Image ${placeholderImages.indexOf(mainImage)}`} // Changed alt text to match selected image
            className="max-w-full max-h-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MyImage;
