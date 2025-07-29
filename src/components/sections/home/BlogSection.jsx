import React from "react";
import { blogPosts } from "../../../assets/assets";
import { MdArrowRightAlt } from "react-icons/md";
import BuySellCards from "../../utils/BuySellCards";

const BlogSection = () => {
  return (
    <div className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      {/* Top Section - Blog Header */}
      <div className="mb-10">
        <h2 className="md:text-3xl text-2xl font-bold text-gray-900">
          Latest Blog Posts
        </h2>
      </div>

      {/* Blog Cards - Horizontal Scroll */}
      <div
        id="blog"
        className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-8"
      >
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="md:w-[390px] w-full min-w-[85vw] md:min-w-[390px] bg-[#d9d9d9] rounded px-6 py-6 flex-shrink-0 overflow-hidden"
          >
            <img
              src={post.image}
              alt="post"
              className="w-full h-64 object-cover rounded-lg mb-5"
            />
            <div className="mb-3 flex items-center justify-between">
              <h5 className="text-sm text-gray-500 font-medium">
                By {post.author}
              </h5>
              <p className="text-xs text-gray-400">{post.createdAt}</p>
            </div>
            <h4 className="text-lg upercase font-bold text-gray-900 leading-snug">
              {post.title}
            </h4>
            <p className="mt-3 text-gray-600 line-clamp-2">{post.excerpt}</p>
            {/* <button className="mt-4 text-primary-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Read more
              <MdArrowRightAlt className="text-xl" />
            </button> */}
          </div>
        ))}
      </div>

      {/* Bottom Section - Buy/Sell Cards */}
      {/* <div className="flex flex-col md:flex-row md:gap-16 gap-3 md:pt-16">
        {goThemBuyOrSell.map((post, index) => (
          <div className="w-full md:w-1/2  p-8 " key={index}>
            <h3 className="md:text-2xl text-xl font-bold text-gray-900 mb-4">
              {post.title}
            </h3>
            <p className="text-base text-gray-600 mb-6">{post.description}</p>
            <div className="flex  sm:flex-row items-center sm:items-center gap-6 justify-between">
              <button className="bg-primary-500 hover:opacity-90  transition-colors flex items-center gap-2 px-6 py-3 rounded-lg font-medium">
                Get Started
                <MdArrowRightAlt className="text-xl -rotate-[42deg]" />
              </button>
              <img
                src={post.image}
                alt="go image buy or sell"
                className="w-full max-w-[90px] object-contain"
              />
            </div>
          </div>
        ))}
      </div> */}
      {/* <BuySellCards /> */}
    </div>
  );
};

export default BlogSection;
