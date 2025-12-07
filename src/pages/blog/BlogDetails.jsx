import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../redux/services/api";
import { formatDate } from "../../utils/format";
import BlogsHeroSection from "../../components/sections/blogs/BlogsHeroSection";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogByIdQuery(id);

  const blog = data;

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div>
        <BlogsHeroSection />
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <BlogsHeroSection />
        <div className="text-center py-12 px-4">
          <p className="text-red-500 text-lg mb-4">Blog post not found.</p>
          <Link
            to="/blog/all"
            className="text-primary-500 hover:underline"
          >
            Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BlogsHeroSection />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            {blog.category && (
              <>
                <Link
                  to={`/blog?category=${blog.category._id}`}
                  className="text-primary-500 hover:underline"
                >
                  {blog.category.name}
                </Link>
                <span>·</span>
              </>
            )}
            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            <span>·</span>
            <span>{blog.readTime || 5} min read</span>
            {blog.views > 0 && (
              <>
                <span>·</span>
                <span>{blog.views} views</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            {blog.author?.avatar ? (
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-lg">
                {(blog.author?.name || "A")[0].toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">
                {blog.author?.name || "Admin"}
              </h3>
              <p className="text-sm text-gray-500">
                {blog.author?.email || ""}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <Link
            to="/blog/all"
            className="text-primary-500 hover:underline inline-flex items-center gap-2"
          >
            ← Back to all blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
