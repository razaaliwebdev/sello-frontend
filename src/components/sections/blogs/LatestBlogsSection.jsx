import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../../redux/services/api";
import Spinner from "../../Spinner";
import { formatDate } from "../../../utils/format";

const LatestBlogsSection = () => {
  const { data, isLoading } = useGetBlogsQuery({ 
    limit: 5, 
    status: 'published' 
  });

  const blogs = data?.blogs || [];
  const latestBlog = blogs[0];
  const trendingBlogs = blogs.slice(1, 4);
  const highlightedBlog = blogs[4] || blogs[3];

  if (isLoading) {
    return (
      <div className="w-full p-4 flex justify-center items-center min-h-[400px]">
        <Spinner size={50} color="text-primary-500" />
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="md:h-[125vh] w-full p-4">
      {/* 👉 stack on small screens, row only on md+ */}
      <div className="flex flex-col md:flex-row w-full h-full p-3 gap-10">
        {/* Left section - Latest Blog */}
        {latestBlog && (
          <div className="w-full md:w-1/2 h-full">
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-semibold my-5">Latest</h2>
              {latestBlog.featuredImage && (
                <img
                  className="w-full h-auto object-cover rounded-lg"
                  src={latestBlog.featuredImage}
                  alt={latestBlog.title}
                />
              )}
            </div>
            <div className="w-full py-3 text-gray-500 text-sm md:text-base">
              By{" "}
              <span className="text-base md:text-lg text-primary-500 font-medium">
                {latestBlog.author?.name || "Sello"}
              </span>{" "}
              | {formatDate(latestBlog.publishedAt || latestBlog.createdAt)}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold my-3">
                {latestBlog.title}
              </h2>
              <p className="text-base md:text-lg text-gray-700 py-2 line-clamp-3">
                {latestBlog.excerpt || latestBlog.content?.replace(/<[^>]*>/g, '').substring(0, 200) + "..."}
              </p>
              <Link
                to={`/blog/${latestBlog._id}`}
                className="inline-block px-5 md:px-6 py-2 text-base md:text-lg font-medium bg-primary-500 text-white rounded-lg my-5 hover:opacity-90"
              >
                Read more
              </Link>
            </div>
          </div>
        )}

        {/* Right section - Trending Blogs */}
        <div className="w-full md:w-1/2 h-full">
          <div className="flex flex-col md:flex-row mt-5 items-start md:items-center justify-between w-full gap-2 md:gap-0">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Trending Blogs
            </h2>
            <Link to="/blog/all" className="text-sm md:text-base text-primary-500 hover:underline">
              See all
            </Link>
          </div>

          {/* Trending blogs list */}
          {trendingBlogs.map((blog, index) => (
            <div key={blog._id} className={index > 0 ? "mt-10" : ""}>
              <div className="w-full py-3 text-gray-500 text-sm md:text-base">
                By{" "}
                <span className="text-base md:text-lg text-primary-500 font-medium">
                  {blog.author?.name || "Sello"}
                </span>{" "}
                | {formatDate(blog.publishedAt || blog.createdAt)}
              </div>
              <Link to={`/blog/${blog._id}`}>
                <h3 className="text-2xl md:text-3xl font-semibold pr-0 md:pr-7 hover:text-primary-500 transition-colors">
                  {blog.title}
                </h3>
              </Link>
            </div>
          ))}

          {/* Highlighted blog */}
          {highlightedBlog && (
            <Link to={`/blog/${highlightedBlog._id}`}>
              <div className="bg-primary-500 flex items-start justify-center flex-col my-10 rounded-tr-[40px] rounded-bl-[40px] px-5 py-3 hover:opacity-90 transition-opacity">
                <div className="py-3 text-gray-50 text-sm md:text-base">
                  By{" "}
                  <span className="text-base md:text-lg text-black my-3 font-medium">
                    {highlightedBlog.author?.name || "Sello"}
                  </span>{" "}
                  | {formatDate(highlightedBlog.publishedAt || highlightedBlog.createdAt)}
                </div>
                <h3 className="text-2xl md:text-3xl font-medium py-4 md:py-6 text-white">
                  {highlightedBlog.title}
                </h3>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogsSection;
