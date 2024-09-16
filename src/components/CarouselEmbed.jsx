import React, { useState, useEffect } from "react";

function CarouselEmbed({ reviews }) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Auto-change reviews every 4 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="relative overflow-hidden w-full h-auto">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentReviewIndex * 100}%)`,
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={review._id}
            className="min-w-full flex flex-col items-center p-4"
          >
            <div
              style={{
                "--highlight-color": "#fef3c7",
                "--highlight-text-color": "#111827",
                borderStyle: "solid",
                width: "300px", // Adjusted width for carousel item
              }}
              className="testimonial-card flex flex-col p-4 border text-testimonial rounded-lg bg-white hover:bg-gray-50 border-gray-200 text-gray-800 mx-auto"
            >
              <div className="flex flex-row mb-4 items-center">
                <div
                  style={{ width: "40px", height: "40px", minWidth: "40px" }}
                  className="relative"
                >
                  <div
                    style={{
                      backgroundColor: "#5d5dff",
                      width: "40px",
                      height: "40px",
                    }}
                    className="rounded-full text-white flex justify-center items-center"
                  >
                    <span style={{ fontSize: "20px", color: "#ffffff" }}>
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="font-bold not-italic text-left text-sm">
                    {review.name}
                  </p>
                </div>
              </div>

              <div className="mb-2 text-center">
                <div
                  className="inline-block"
                  title={`${review.rating} Stars`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      viewBox="0 0 51 48"
                      className="widget-svg"
                      style={{
                        width: "20px",
                        height: "20px",
                        fill: index < review.rating ? "#FFB621" : "#CBD3E3",
                        margin: "0 2px", // Space between stars
                      }}
                    >
                      <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path>
                    </svg>
                  ))}
                </div>
              </div>

              {review.image && (
                <div className="mb-4">
                  <div className="relative w-full select-none overflow-hidden rounded-lg">
                    <div className="grow flex relative bg-black transition-all justify-center">
                      <img
                        alt="attached"
                        src={review.image}
                        className="object-contain select-none transition-all cursor-pointer hover:opacity-75"
                        style={{ width: "200px" }} // Adjusted image size for carousel item
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-grow text-sm text-center">
                <blockquote
                  className="overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    textAlign: "center",
                    lineHeight: "1.4",
                  }}
                >
                  {review.text}
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReviewIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentReviewIndex
                ? "bg-blue-600"
                : "bg-gray-400 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselEmbed;
