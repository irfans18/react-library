export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-6 text-white md:p-8">
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Welcome to
            <br />
            Booky
          </h1>
        </div>
        
        {/* Animated children illustrations */}
        <div className="hidden md:flex items-center gap-4">
          {/* Left child with book */}
          <div className="relative">
            <div className="h-20 w-16 rounded-full bg-white/20 flex items-center justify-center md:h-24 md:w-20">
              <div className="text-xl md:text-2xl">👦</div>
            </div>
            <div className="absolute -bottom-2 -left-2 h-6 w-5 rounded bg-orange-400 rotate-12 flex items-center justify-center text-xs md:h-8 md:w-6">
              📖
            </div>
          </div>
          
          {/* Right child with paper plane */}
          <div className="relative">
            <div className="h-20 w-16 rounded-full bg-white/20 flex items-center justify-center md:h-24 md:w-20">
              <div className="text-xl md:text-2xl">👧</div>
            </div>
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs animate-bounce md:h-8 md:w-8">
              ✈️
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-1/4 h-12 w-12 rounded-full bg-white animate-pulse md:h-16 md:w-16"></div>
        <div className="absolute bottom-8 right-1/3 h-8 w-8 rounded-full bg-white animate-pulse delay-1000 md:h-12 md:w-12"></div>
        <div className="absolute top-1/2 right-8 h-6 w-6 rounded-full bg-white animate-pulse delay-500 md:h-8 md:w-8"></div>
      </div>
      
      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="h-2 w-2 rounded-full bg-white"></div>
        <div className="h-2 w-2 rounded-full bg-white/50"></div>
        <div className="h-2 w-2 rounded-full bg-white/50"></div>
      </div>
    </div>
  )
}
