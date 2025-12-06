import React from "react";
import { footerData } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { apple, android, facebook, twitter, instagram, linkedin } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  const handleFilterClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-[#050B20] text-white px-4 md:px-16 pt-12 pb-8">
      {/* Main Footer Content */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10 mb-12">
        {footerData.map((section, index) => (
          <div key={index}>
            {section.title && (
              <h4 className="text-primary-500 text-sm font-bold mb-4 uppercase tracking-wide">
                {section.title}
              </h4>
            )}

            {/* Links */}
            <ul className="space-y-2">
              {section.links &&
                section.links.map((link, i) => (
                  <li key={i}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        onClick={() => link.path.startsWith('/filter') && handleFilterClick(link.path)}
                        className="text-gray-300 hover:text-white text-xs md:text-sm transition-colors duration-200 block"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <span className="text-gray-300 text-xs md:text-sm">{link.name}</span>
                    )}
                  </li>
                ))}
              {section.types &&
                section.types.map((type, i) => (
                  <li key={i} className="text-gray-300 text-xs md:text-sm">
                    {type}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Information & App Downloads */}
      <div className="border-t border-gray-700 pt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-primary-500 text-sm font-bold mb-4 uppercase tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <span className="font-medium">Address:</span> Sello.ae Head Office, JLT, Dubai, UAE
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:+97145061300" className="hover:text-white transition-colors">
                  +971 45 061 300
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:info@sello.ae" className="hover:text-white transition-colors">
                  info@sello.ae
                </a>
              </p>
            </div>
          </div>

          {/* Mobile App Downloads */}
          <div>
            <h4 className="text-primary-500 text-sm font-bold mb-4 uppercase tracking-wide">
              Download Our App
            </h4>
            <div className="space-y-3">
              {/* App Store Button */}
              <a
                href="https://apps.apple.com/app/sello"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black rounded-xl px-5 py-3.5 hover:bg-gray-900 transition-all duration-300 w-full md:w-auto min-w-[200px]"
              >
                <div className="flex-shrink-0">
                  <img
                    src={apple}
                    alt="App Store"
                    className="w-8 h-8 object-contain brightness-0 invert"
                  />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] text-white/70 font-medium uppercase tracking-wide leading-tight mb-0.5">
                    Download on the
                  </p>
                  <p className="text-base font-bold text-white leading-tight">
                    Apple Store
                  </p>
                </div>
              </a>
              
              {/* Google Play Button */}
              <a
                href="https://play.google.com/store/apps/details?id=ae.sello"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black rounded-xl px-5 py-3.5 hover:bg-gray-900 transition-all duration-300 w-full md:w-auto min-w-[200px]"
              >
                <div className="flex-shrink-0">
                  <img
                    src={android}
                    alt="Google Play"
                    className="w-8 h-8 object-contain brightness-0 invert"
                  />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] text-white/70 font-medium uppercase tracking-wide leading-tight mb-0.5">
                    Get in on
                  </p>
                  <p className="text-base font-bold text-white leading-tight">
                    Google Play
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-primary-500 text-sm font-bold mb-4 uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://facebook.com/sello.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                title="Facebook"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://twitter.com/sello_ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                title="Twitter"
              >
                <img
                  src={twitter}
                  alt="Twitter"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://instagram.com/sello.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                title="Instagram"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://linkedin.com/company/sello-ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                title="LinkedIn"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://sello.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600 transition-colors"
          >
            Sello.ae
          </a>
          . All rights reserved.
        </p>
        <div className="text-sm flex items-center gap-4 flex-wrap justify-center">
          <Link 
            to="/terms-conditon" 
            className="text-primary-500 hover:text-primary-600 transition-colors"
          >
            Terms & Conditions
          </Link>
          <span className="text-gray-500">•</span>
          <Link 
            to="/privacy-policy" 
            className="text-primary-500 hover:text-primary-600 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
