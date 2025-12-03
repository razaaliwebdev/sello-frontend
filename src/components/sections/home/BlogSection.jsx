import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../../redux/services/api";
import { MdArrowRightAlt } from "react-icons/md";
import Spinner from "../../Spinner";

const BlogSection = () => {
  const { data, isLoading } = useGetBlogsQuery({ 
    limit: 6, 
    status: 'published',
    isFeatured: true 
  });

  const blogs = data?.blogs || [];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      {/* Top Section - Blog Header */}
      <div className="mb-10 flex justify-between items-center">
        <h2 className="md:text-3xl text-2xl font-bold text-gray-900">
          Latest Blog Posts
        </h2>
        {blogs.length > 0 && (
          <Link
            to="/blog/all"
            className="text-primary-500 font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All
            <MdArrowRightAlt className="text-xl" />
          </Link>
        )}
      </div>

      {/* Blog Cards - Horizontal Scroll */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spinner size={50} color="text-primary-500" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No blog posts available yet.</p>
        </div>
      ) : (
        <div
          id="blog"
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-8"
        >
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="md:w-[390px] w-full min-w-[85vw] md:min-w-[390px] bg-white rounded-lg px-6 py-6 flex-shrink-0 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={blog.featuredImage || "https://via.placeholder.com/600x400?text=No+Image"}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg mb-5"
              />
              <div className="mb-3 flex items-center justify-between">
                <h5 className="text-sm text-gray-500 font-medium">
                  By {blog.author?.name || "Admin"}
                </h5>
                <p className="text-xs text-gray-400">
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </p>
              </div>
              <h4 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                {blog.title}
              </h4>
              <p className="mt-3 text-gray-600 line-clamp-2">
                {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').substring(0, 150) + "..."}
              </p>
              <button className="mt-4 text-primary-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Read more
                <MdArrowRightAlt className="text-xl" />
              </button>
            </Link>
          ))}
        </div>
      )}

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
