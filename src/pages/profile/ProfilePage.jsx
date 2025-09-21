import React from "react";
import ProfileHero from "../../components/sections/profile/ProfileHero";
import OnlineBanner from "../../components/sections/profile/OnlineBanner";
import ReachUsSection from "../../components/sections/profile/ReachUsSection";

const ProfilePage = () => {
  return (
    <div>
      <ProfileHero />
      <OnlineBanner />
      <ReachUsSection />
    </div>
  );
};

export default ProfilePage;
