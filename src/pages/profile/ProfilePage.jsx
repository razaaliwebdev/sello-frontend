import React from "react";
import ProfileHero from "../../components/sections/profile/ProfileHero";
import OnlineBanner from "../../components/sections/profile/OnlineBanner";
import ReachUsSection from "../../components/sections/profile/ReachUsSection";
import CustomerReviews from "../../components/sections/carDetails/CustomerReviews";
import NewsLatter from "../../components/utils/NewsLatter";

const ProfilePage = () => {
  return (
    <div>
      <ProfileHero />
      <OnlineBanner />
      <CustomerReviews />
      <ReachUsSection />
      <NewsLatter />
    </div>
  );
};

export default ProfilePage;
