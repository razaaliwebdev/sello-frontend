import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../../../redux/services/api";
import Spinner from "../../../Spinner";

const BlogPosts = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetBlogsQuery({ 
    page, 
    limit: 10, 
    status: 'published' 
  });

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || {};

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="md:px-10 md:py-12 px-5 py-6 flex justify-center items-center min-h-[400px]">
        <Spinner size={60} color="text-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:px-10 md:py-12 px-5 py-6">
        <p className="text-red-500">Error loading blogs. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="md:px-10 md:py-12 px-5 py-6">
      <h2 className="md:text-3xl text-2xl font-semibold">All Posts</h2>

      <div className="border border-gray-200 my-5"></div>

      {/* All Posts */}
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts available yet.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-10">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
              >
                {/* Blog Image */}
                <div className="w-full md:w-1/3 h-[220px] md:h-[360px] rounded-tr-[40px] md:rounded-tr-[70px] rounded-bl-[40px] md:rounded-bl-[70px] overflow-hidden shadow-md">
                  <img
                    src={blog.featuredImage || "https://via.placeholder.com/600x400?text=No+Image"}
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
                    {blog.author?.avatar ? (
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name || "Author"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                        {(blog.author?.name || "A")[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-medium">{blog.author?.name || "Admin"}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span> ·{" "}
                        <span>{blog.readTime || 5} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="my-4 text-gray-600 leading-relaxed text-sm md:text-base line-clamp-3">
                    {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').substring(0, 200) + "..."}
                  </p>

                  {/* Button */}
                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-block bg-primary-500 hover:opacity-90 text-white text-sm md:text-base px-4 md:px-5 py-2 rounded mt-2 md:mt-5 transition-all"
                  >
                    Read full article...
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={page >= pagination.pages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPosts;
