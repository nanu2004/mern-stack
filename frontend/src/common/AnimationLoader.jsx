function AnimationLoader() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
          <div className="mt-2 flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  export { AnimationLoader };