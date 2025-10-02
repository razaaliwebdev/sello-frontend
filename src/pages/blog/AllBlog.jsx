import React from "react";
import BlogsHeroSection from "../../components/sections/blogs/BlogsHeroSection";
import BlogPosts from "../../components/sections/blogs/allBlogs/BlogPosts";

const AllBlog = () => {
  return (
    <div>
      <BlogsHeroSection />
      <BlogPosts />
    </div>
  );
};

export default AllBlog;
