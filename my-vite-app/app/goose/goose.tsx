
import { Link } from "react-router-dom";  // Import from react-router-dom for correct routing
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Goose() {
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(0);
  const getExp = async () => {
    const response = await axios.get('http://10.36.133.193:3000/api/classify')
    console.log(response.data)
    setExp(response.data)
  }
  useEffect(() => {
    const targetExp = 100;  // Max EXP value
    const duration = 10000;  // 10 seconds in milliseconds
    const increment = targetExp / (duration / 100);  // Calculate the increment per interval (every 100ms)

    const interval = setInterval(() => {
      setExp((prevExp) => {
        if (prevExp + increment >= targetExp) {
          clearInterval(interval);  // Clear interval once we reach the target
          return targetExp;
        }
        return prevExp + increment;  // Increment EXP by calculated amount
      });
    }, 100);  // Update every 100ms

    return () => clearInterval(interval);  // Cleanup interval on unmount
  }, [exp]);  

  const getGooseImage = () => {
    if (exp >= 100) {
      return "./goose.png";  // Example new image after EXP reaches max
    }
    else if (exp > 50) {
      return "./robot_goose.png"
    }
    return "./robot.png";  // Default image before EXP reaches max
  };

  return (
    <main className="w-full min-h-screen bg-sky-200 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-[16/9] bg-sky-300 border-4 border-black shadow-lg">
        {/* Background Image */}
        <img
          src="/background.png"
          alt="Goose game scene"
          className="object-cover"
        />

        {/* Navigation */}
        <nav className="absolute top-4 right-4 flex gap-4 z-10">
          <Link to="/" className="px-4 py-2 bg-black text-white font-pixel hover:bg-gray-800 transition-colors">
            HOME
          </Link>
          <Link to="/map" className="px-4 py-2 bg-black text-white font-pixel hover:bg-gray-800 transition-colors">
            MAP
          </Link>
        </nav>

        {/* Main Character */}
        <div className="absolute left-1/2 top-[65%] transform -translate-x-1/2 -translate-y-1/2 z-20">
          <img
            src={getGooseImage()}  // Step 4: Use conditional rendering for the image
            className="w-80 h-80"
            alt="Goose"
          />
        </div>

        {/* Status Bars */}
        <StatusBars exp={exp} />
      </div>
    </main>
  );
}

function StatusBars({ exp }: { exp: number }) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-4 z-10 items-start">
      {/* Stack the labels and bars vertically with spacing, aligned to the left */}
      <StatusBar label="EXP" value={exp} color="bg-yellow-400" />
      <StatusBar label="IMG" value={0} color="bg-green-400" />
    </div>
  );
}

function StatusBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-black text-xl">{label}</span>
      <div className="w-48 h-8 bg-sky-100 border-2 border-black">
        <div className={`h-full ${color}`} style={{ width: `${(value / 100) * 100}%` }} />
      </div>
    </div>
  );
}




