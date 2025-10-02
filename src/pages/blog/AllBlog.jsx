import React from "react";
import BlogsHeroSection from "../../components/sections/blogs/BlogsHeroSection";
import BlogPosts from "../../components/sections/blogs/allBlogs/BlogPosts";
import NewsLatter from "../../components/utils/NewsLatter";

const AllBlog = () => {
  return (
    <div>
      <BlogsHeroSection />
      <BlogPosts />
      <NewsLatter />
    </div>
  );
};

export default AllBlog;
