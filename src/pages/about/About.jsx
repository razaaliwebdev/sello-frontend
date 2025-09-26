import React from "react";
import AboutHeroSection from "../../components/sections/about/AboutHeroSection";
import OutStorySection from "../../components/sections/about/OutStorySection";
import JoinUsSection from "../../components/sections/about/JoinUsSection";
import OurTeam from "../../components/sections/about/OurTeam";
import ReviewsAnalysis from "../../components/sections/about/ReviewsAnalysis";

const About = () => {
  return (
    <div>
      <AboutHeroSection />
      <OutStorySection />
      <JoinUsSection />
      <OurTeam />
      <ReviewsAnalysis />
    </div>
  );
};

export default About;
