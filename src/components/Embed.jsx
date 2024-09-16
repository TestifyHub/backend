import React from "react";
import AnimatedEmbed from "./AnimatedEmbed";
import FixedEmbed from "./FixedEmbed";
import CarouselEmbed from "./CarouselEmbed";

function Embed({ type, reviews }) {
  if (type === "animated") {
    return <AnimatedEmbed reviews={reviews} />;
  } else if (type === "carousel") {
    return <CarouselEmbed reviews={reviews} />;
  } else {
    return <FixedEmbed reviews={reviews} />;
  }
}

export default Embed;
