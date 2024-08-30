import React from "react";
import AnimatedEmbed from "./AnimatedEmbed";
import FixedEmbed from "./FixedEmbed";
import CarouselEmbed from "./CarouselEmbed";

function Embed({ type, reviews }) {
  if (type === "animated") {
    return <AnimatedEmbed reviews={reviews} />;
  } else if (type === "fixed") {
    return <FixedEmbed reviews={reviews} />;
  } else if (type === "carousel") {
    return <CarouselEmbed reviews={reviews} />;
  } else {
    return <div className="bg-sky-400 text-red-400">Invalid embed type</div>;
  }
}

export default Embed;
