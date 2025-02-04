import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar skeleton */}
        <div className="w-full md:w-1/4 bg-gray-200 h-screen hidden md:block"></div>
        
        {/* Main content skeleton */}
        <div className="flex-1 p-4">
          {/* Image gallery skeleton */}
          <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
          <div className="flex space-x-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
          
          {/* Product details skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          
          {/* Key features skeleton */}
          <div className="mt-6">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
