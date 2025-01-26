import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router"
import "./app.css"
export default function Welcome() {
  const [started, setStarted] = useState(false)

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
      <div className="relative w-full max-w-4xl aspect-video rounded-lg z-0 overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <AnimatePresence>
            {!started ? (
              <motion.div
              className="max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => setStarted(true)}
            >
              <img
              src="geese_logo.png"
              alt="Geese Logo"
              width={800}
              height={300}
              className="w-full h-auto"
            />
            </motion.div>
              
              
            ) : (
              <div className=" z-10 h-full flex flex-col items-center justify-center">
                <div className="text-black  bg-white border-black border-4 mx-10 p-5 text-center">
                    Ever since Geus was a wee little robot they had always wanted to fly and swim with the other Canadian Geese at UW. Although, knowing nothing about Canadian Geese, Geus didn’t have the slightest clue about how to be a goose. One day it’s luck turned around, when Geus met you and you two struck up a deal where you’d help Geus learn about how to be a goose and in return Geus will convince the other geese to stop hissing and biting at you.
                  </div>
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    duration: 0.8,
                  }}
                  
                  className="relative mt-4"
                >
                  
                  <Link to="/goose">
                  <motion.button
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    
                    className="bg-black/80 text-white px-12 py-4 rounded-full text-2xl font-bold backdrop-blur-sm border border-white/20 shadow-2xl"
                  >
                    
                    START
                 
                </motion.button>
                 </Link>
                  {/* Logo */}
                  
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Reset Button */}
        {started && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setStarted(false)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/60 hover:text-black"
          >
            Back
          </motion.button>
        )}
      </div>
      
    </div>

    </div>
  )
}

