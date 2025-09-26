import React from "react";
import { aboutImages } from "../../../assets/about/aboutAssets";

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO",
      description:
        "Promoted to CEO in 2023 and charged with driving our next phase of growth, having successfully led our Commercial, Operations, and International teams.",
      image: aboutImages.team,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO",
      description:
        "Leading our technology strategy with over 15 years of experience in building scalable platforms and managing global engineering teams.",
      image: aboutImages.team,
    },
  ];

  return (
    <div className="bg-primary-500">
      <div className="bg-[#D9D9D9] py-10 px-4 sm:px-6 lg:px-8 rounded-tr-[50px]">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium py-5 text-center md:text-left">
          Our Team
        </h2>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              {/* Image Container */}
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] h-[300px] sm:h-[350px] flex justify-center items-end">
                {/* Background Shapes */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-primary-500 -rotate-3 z-0"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[70px] bg-black rotate-2 z-10"></div>

                {/* Team Member Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative bottom-12 z-20 max-h-[220px] sm:max-h-[260px] object-contain w-auto"
                />
              </div>

              {/* Text Content */}
              <div className="mt-6 text-center max-w-md w-full px-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="font-medium  mb-3">{member.position}</p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
