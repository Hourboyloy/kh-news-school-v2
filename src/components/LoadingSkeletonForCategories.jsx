const LoadingSkeletonForCategories = ({ items = 24 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2 mb-5">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded shadow overflow-hidden"
        >
          <div className="w-full h-[130px] md:h-[160px] lg:h-[170px] xl:h-[180px] bg-gray-300"></div>
          <div className="py-2 px-2 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletonForCategories