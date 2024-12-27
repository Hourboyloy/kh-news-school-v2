import React from "react";

const LoadingDetails = () => {
  return (
    <div className="min-h-screen animate-pulse w-full">
      <div className="grid grid-cols-3 gap-4">
        {/* Left */}
        <div className="lg:col-span-2 col-span-3 bg-white xl:p-10 p-6 shadow-md border border-gray-200">
          {/* Title Placeholder */}
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded mb-6"></div>

          {/* Content Placeholder */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Image Placeholder */}
          <div className="w-full h-64 bg-gray-300 rounded mt-6"></div>

          {/* Comments Placeholder */}
          <div className="mt-8 space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-1 md:col-span-2 col-span-3 space-y-4">
          {/* Popular Articles Placeholder */}
          <div className="space-y-3 md:space-y-2 bg-white p-2.5 shadow-md border border-gray-200">
            <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
            <div className="h-16 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-16 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-16 bg-gray-300 rounded w-full mb-2"></div>
          </div>

          {/* Newest Articles Placeholder */}
          <div className="space-y-3 md:space-y-2 bg-white p-2.5 shadow-md border border-gray-200">
            <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
            <div className="h-16 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-16 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-16 bg-gray-300 rounded w-full mb-2"></div>
          </div>
        </div>
      </div>

      {/* Related Articles Placeholder */}
      <div className="w-full bg-white my-4 lg:p-6 md:p-4 p-3 shadow-md border border-gray-200 space-y-4">
        <div className="space-y-0.5">
          <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-1 w-11 bg-gray-300 rounded"></div>
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-3.5">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-1">
              <div className="w-full h-32 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingDetails;
