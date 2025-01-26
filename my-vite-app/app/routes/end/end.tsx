export default function End() {
    return (
      <div className="bg-sky-200">
      <div className="min-h-screen bg-sky-200 flex items-center justify-center p-4">
        {/* Main Container with constrained size */}
        <div className="absolute w-full max-w-4xl aspect-[16/9] bg-sky-300 border-4 border-black shadow-lg ">
          <img
            src="bg-shadowless.png"
            alt="Pastoral scene with geese"
            className="object-cover"
          />
          </div>
        <div className="h-[150px] w-[350px] bg-white text-black z-10 flex text-center items-center border-4 border-black rounded-md">
            Thank you for joining Geus on his journey to becoming a goose!
        </div>
      </div>
  
      </div>
    )
  }
  