import React, { useState, useRef } from "react";
import { images, menuLinks } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./utils/SearchBar";
import { FaCirclePlus, FaBars, FaXmark } from "react-icons/fa6";
import gsap from "gsap";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const linkRefs = useRef([]);

  const isActive = (path) => location.pathname === path;

  const openDrawer = () => {
    setOpen(true);
    setTimeout(() => {
      gsap.fromTo(
        drawerRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.8, ease: "bounce.out" }
      );
      gsap.fromTo(
        linkRefs.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay: 0.2,
        }
      );
    }, 10);
  };

  const closeDrawer = () => {
    gsap.to(linkRefs.current, {
      x: 100,
      opacity: 0,
      duration: 0.4,
      ease: "back.in(1.3)",
      stagger: {
        each: 0.1,
        from: "end",
      },
    });
    gsap.to(drawerRef.current, {
      xPercent: 100,
      duration: 0.8,
      ease: "bounce.in",
      delay: 0.4,
      onComplete: () => setOpen(false),
    });
  };

  return (
    <>
      <nav className="bg-primary-500 w-full px-4 md:px-8 py-2 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => navigate("/home")} className="cursor-pointer">
          <img className="h-14 md:h-20" src={images.logo} alt="logo" />
        </div>

        {/* Search Bar (Desktop only) */}
        <div className="hidden lg:block w-full max-w-md">
          <SearchBar />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-white text-lg">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={` ${isActive(link.path) ? "font-bold" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-white text-3xl">
          {/* Desktop Create Post */}
          <button
            onClick={() => navigate("/create-post")}
            className="hover:text-white/80 hidden md:block"
            title="Create Post"
          >
            <FaCirclePlus />
          </button>
          <button onClick={openDrawer} title="Menu">
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          ref={drawerRef}
          className="fixed top-0 right-0 w-full sm:w-[80%] h-full z-50 text-primary-900 px-6 py-6 mobile-drawer bg-primary-300 shadow-xl"
        >
          {/* Close Button */}
          <div className="flex justify-end text-3xl mb-6">
            <button onClick={closeDrawer}>
              <FaXmark />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar />
          </div>

          {/* Menu Links */}
          <div className="flex flex-col gap-4 text-lg">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                ref={(el) => (linkRefs.current[index] = el)}
                onClick={closeDrawer}
                className={`border-b border-primary-300 pb-2 ${
                  isActive(link.path) ? "font-bold text-black" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Create Post Button */}
            <button
              onClick={() => {
                closeDrawer();
                navigate("/create-post");
              }}
              className="mt-4 flex items-center gap-2 text-primary-700"
            >
              <FaCirclePlus />
              Create Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
