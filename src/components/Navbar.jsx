import React, { useState, useRef } from "react";
import { images, menuLinks } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./utils/SearchBar";
import { FaCirclePlus, FaBars, FaXmark } from "react-icons/fa6";
import gsap from "gsap";
import { useGetMeQuery } from "../redux/services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const linkRefs = useRef([]);
  const { data: currentUser, isLoading } = useGetMeQuery();

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
      stagger: { each: 0.1, from: "end" },
    });
    gsap.to(drawerRef.current, {
      xPercent: 100,
      duration: 0.8,
      ease: "bounce.in",
      delay: 0.4,
      onComplete: () => setOpen(false),
    });
  };

  const avatarFallback = () => {
    if (!currentUser) return images.avatarIcon;
    if (currentUser.avatar) return currentUser.avatar;
    const name = currentUser.name || currentUser.email || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name.charAt(0)
    )}`;
  };

  return (
    <>
      <nav
        className={`w-full px-4 md:px-8 py-2 flex items-center justify-between sticky top-0 z-50  ${
          location.pathname === "/cars" ||
          location.pathname === "/users" ||
          location.pathname === "/blog"
            ? "md:bg-[#f5f5f5] md:text-gray-600"
            : "bg-primary-500 text-white"
        }`}
      >
        {/* Logo */}
        <div onClick={() => navigate("/home")} className="cursor-pointer">
          <img
            className="h-14 md:h-20"
            src={
              location.pathname === "/cars" ||
              location.pathname === "/users" ||
              location.pathname === "/blog"
                ? images.blackLogo
                : images.logo
            }
            alt="logo"
          />
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:block w-full max-w-md">
          <SearchBar />
        </div>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex items-center gap-6 text-lg ${
            location.pathname === "/cars" ||
            location.pathname === "/users" ||
            location.pathname === "/blog"
              ? "text-gray-600"
              : "text-white"
          }`}
        >
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={isActive(link.path) ? "font-bold" : ""}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* User Avatar / Login + Actions */}
        <div className="flex items-center gap-4 text-white text-3xl">
          {!isLoading && currentUser ? (
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer md:w-14 w-12 md:h-14 h-12 rounded-full overflow-hidden border-2 border-white"
                title="Profile"
              >
                <img
                  src={avatarFallback()}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="md:px-6 md:py-2 py-1 px-4 bg-[#050B20] rounded-md text-lg text-white"
            >
              Login
            </button>
          )}

          {/* Create Post Button (Desktop) */}
          <button
            onClick={() => navigate("/create-post")}
            className={`hover:placeholder-opacity-85 hidden md:block ${
              location.pathname === "/cars" ||
              location.pathname === "/users" ||
              location.pathname === "/blog"
                ? "text-gray-600 "
                : "text-white"
            }`}
            title="Create Post"
          >
            <FaCirclePlus />
          </button>

          {/* Mobile Menu */}
          <button
            onClick={openDrawer}
            title="Menu"
            className={`${
              location.pathname === "/cars" ||
              location.pathname === "/users" ||
              location.pathname === "/blog"
                ? "text-gray-600"
                : "text-white"
            }`}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          ref={drawerRef}
          className="fixed top-0 right-0 w-[99.5%] sm:w-[80%] h-full z-50 text-primary-900 px-6 py-6 bg-primary-300 shadow-xl md:hidden"
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

          {/* Drawer Menu Links */}
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

            {/* Create Post (Mobile) */}
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
