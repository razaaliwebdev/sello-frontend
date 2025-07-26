import React from "react";
import { footerData } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#050B20] text-white px-4 border-t border-gray-500 md:px-16 pt-12 pb-5">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
        {footerData.map((section, index) => (
          <div key={index}>
            {section.title && (
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
            )}

            {/* Links and Types */}
            <ul className="space-y-2">
              {section.links &&
                section.links.map((link, i) => (
                  <li key={i}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm">{link.name}</span>
                    )}
                  </li>
                ))}
              {section.types &&
                section.types.map((type, i) => (
                  <li key={i} className="text-gray-400 text-sm">
                    {type}
                  </li>
                ))}
            </ul>

            {/* Mobile App Store Buttons */}
            {section.links && section.links[0]?.icon && (
              <div className="space-y-3 mt-3">
                {section.links.map((app, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-5 md:px-8 px-5 py-2 bg-white/15  rounded-lg"
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="md:w-8 w-5 md:h-8 h-5"
                    />
                    <div className="text-left text-sm">
                      <p className="text-xs">{app.download}</p>
                      <p className="font-semibold">{app.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Social Icons */}
            {section.title2 && (
              <>
                <h4 className="text-lg font-semibold mt-6 mb-3">
                  {section.title2}
                </h4>
                <div className="flex items-center gap-4 flex-wrap">
                  {section.social?.map((s, i) => (
                    <a
                      href={s.link || "#"}
                      key={i}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-6 h-6 hover:opacity-80"
                      />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="pt-12 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center text-sm">
          © 2025{" "}
          <a
            href="https://sello.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary-500"
          >
            Sello.ae
          </a>{" "}
          All rights reserved.
        </p>
        <div className="text-sm flex items-center gap-4">
          <Link to="/terms-conditon" className="hover:text-primary-500">
            Terms & Conditions
          </Link>
          <span className="text-gray-400">•</span>
          <Link to="/privacy-policy" className="hover:text-primary-500">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
