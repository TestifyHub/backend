import React, { useState, useEffect } from "react";

function getRandomPosition() {
  const positions = [
    "top-0 left-0",
    "top-0 right-0",
    "bottom-0 left-0",
    "bottom-0 right-0",
    "top-1/3 left-1/3",
    "bottom-1/4 right-1/4",
    "top-1/4 left-1/4",
    "bottom-1/3 right-1/3",
  ];
  return positions[Math.floor(Math.random() * positions.length)];
}

function getRandomDuration() {
  return Math.random() * 5 + 2; // Random duration between 2s to 7s
}

function AnimatedEmbed({ reviews }) {
  const [activeReviewIndexes, setActiveReviewIndexes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveReviews = [...activeReviewIndexes];
      const randomIndex = Math.floor(Math.random() * reviews.length);
      if (newActiveReviews.includes(randomIndex)) {
        newActiveReviews.splice(newActiveReviews.indexOf(randomIndex), 1);
      } else {
        newActiveReviews.push(randomIndex);
      }
      setActiveReviewIndexes(newActiveReviews);
    }, 2000); // Every 2 seconds, randomize active reviews

    return () => clearInterval(interval);
  }, [activeReviewIndexes, reviews.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {reviews.map((review, index) => (
        <div
          key={review._id}
          className={`absolute transition-opacity duration-[${getRandomDuration()}s] ${
            activeReviewIndexes.includes(index) ? "opacity-100" : "opacity-0"
          } ${getRandomPosition()}`}
          style={{ width: "200px", height: "auto" }}
        >
          <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center">
                <span className="text-lg">
                  {review.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="font-bold text-gray-800">{review.name}</p>
              </div>
            </div>

            <div className="mb-2">
              <div
                className="inline-flex"
                title={`${review.rating} Stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 51 48"
                    className="widget-svg"
                    style={{
                      width: "16px",
                      height: "16px",
                      fill: i < review.rating ? "#FFB621" : "#CBD3E3",
                    }}
                  >
                    <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path>
                  </svg>
                ))}
              </div>
            </div>

            {review.image && (
              <div className="w-24 h-24 overflow-hidden rounded-lg mb-2">
                <img
                  src={review.image}
                  alt="Review attached"
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <p className="text-sm text-center">{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnimatedEmbed;
