import React, { useEffect, useRef, useState } from "react";
import { heroSlides } from "../../../assets/assets";
import gsap from "gsap";
import HeroFilter from "../../utils/HeroFilter";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentImageIndex === heroSlides.length - 1 ? 0 : currentImageIndex + 1;

      gsap.to(slideRefs.current[currentImageIndex], {
        opacity: 0,
        duration: 1.2,  
        ease: "power2.out",
      });

      gsap.to(slideRefs.current[nextIndex], {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      setCurrentImageIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <section className="min-h-[90vh] md:h-screen w-full relative overflow-hidden">
      {/* Background slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slideRefs.current[index] = el)}
          className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: index === 0 ? 1 : 0,
            zIndex: index === currentImageIndex ? 2 : 1,
          }}
        />
      ))}

      {/* Hero Filter */}
      <HeroFilter />
    </section>
  );
};

export default Hero;
