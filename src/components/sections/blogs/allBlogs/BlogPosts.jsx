import React from "react";
import { allBlogsData } from "../../../../assets/blogs/blogAssets";

const BlogPosts = () => {
  return (
    <div className="md:px-10 md:py-12 px-5 py-6">
      <h2 className="md:text-3xl text-2xl font-semibold">All Posts</h2>

      <div className="border border-gray-200 my-5"></div>

      {/* All Posts */}
      <div className="flex flex-col gap-10">
        {allBlogsData.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
          >
            {/* Blog Image */}
            <div className="w-full md:w-1/3 h-[220px] md:h-[360px] rounded-tr-[40px] md:rounded-tr-[70px] rounded-bl-[40px] md:rounded-bl-[70px] overflow-hidden shadow-md">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Blog Content */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl md:text-3xl mb-2 font-semibold leading-snug">
                {blog.title}
              </h3>

              {/* Author Info */}
              <div className="flex items-center gap-3 my-3">
                <img
                  src={blog.authorImg}
                  alt={blog.authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-base font-medium">{blog.authorName}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{blog.publishDate}</span> ·{" "}
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="my-4 text-gray-600 leading-relaxed text-sm md:text-base">
                {blog.description}
              </p>

              {/* Button */}
              <button className="bg-primary-500 hover:opacity-90 text-white text-sm md:text-base px-4 md:px-5 py-2 rounded mt-2 md:mt-5 transition-all">
                Read full article...
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
