import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetBlogByIdQuery, useGetBlogsQuery } from "../../redux/services/api";
import { formatDate } from "../../utils/format";
import BlogsHeroSection from "../../components/sections/blogs/BlogsHeroSection";
import SEO from "../../components/common/SEO";
import Spinner from "../../components/Spinner";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, error, isError } = useGetBlogByIdQuery(id);
  
  // Get related blogs (same category, excluding current blog)
  const { data: relatedBlogsData } = useGetBlogsQuery({
    limit: 3,
    status: 'published',
    category: blog?.category?._id,
    ...(blog?._id && { exclude: blog._id })
  }, {
    skip: !blog?.category?._id
  });

  const relatedBlogs = relatedBlogsData?.blogs?.filter(b => b._id !== blog?._id).slice(0, 3) || [];

  // Redirect to 404 or show error
  useEffect(() => {
    if (isError && error?.status === 404) {
      // Blog not found - could redirect or show error
    }
  }, [isError, error]);

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div>
        <BlogsHeroSection />
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <Spinner fullScreen={false} />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <BlogsHeroSection />
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/blog/all"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').substring(0, 160)}
        image={blog.featuredImage}
        url={`/blog/${blog.slug || blog._id}`}
      />
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
          className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md max-w-none mb-8"
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

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  to={`/blog/${relatedBlog.slug || relatedBlog._id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {relatedBlog.featuredImage && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(relatedBlog.publishedAt || relatedBlog.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedBlog.excerpt || relatedBlog.content?.replace(/<[^>]*>/g, '').substring(0, 100) + "..."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
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
