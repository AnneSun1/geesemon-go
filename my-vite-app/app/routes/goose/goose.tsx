
import { Link, useNavigate } from "react-router-dom";  // Import from react-router-dom for correct routing
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion"
import { io } from 'socket.io-client';
// import { useGoose } from '../../context/gooseContext';

// let exp = 20;
// let level = 50;
interface data {
  exp: number;
  lvl: number;
  num_of_photos: number;
  label: string;
}
export default function Goose() {
  const textArr = ["Right now, Geus is a lowly clumsy hunk of metal who looks nothing like a goose. Help him learn how to be a goose by taking pictures of geese at UW?",
    "Zooweemama! Looks like your pictures really helped Geus transform into a goose! But… he's still lacking some of that rabid aggression and general unpleasantness. Keep taking pictures of geese to help Geus on his journey!",
    "Wowee! Geus really has being a goose figured out! He looks like an actual goose now! Congrats on helping Geus in their transformation! Big ups!"
  ]
  let [bar, setBar] = useState(0)
  let [text, setText] = useState(textArr[0])
  let [exp, setExp] = useState(0);
  let [level, setLevel] = useState(0);
  const [prediction, setPrediction] = useState("")
  const [hasPrediction, setHasPrediction] = useState(false)
  
  const [image, setImage] = useState("./robot.png");
  const getExp = async () => {
  const response = await axios.get('http://127.0.0.1:5000/api/get-data')
    console.log(response.data)
    setExp(response.data.exp)
    setLevel(response.data.level)
    if (response.data.exp == 100 || response.data.exp == 200) {
      setBar(0)
    } else if (response.data.exp > 200) {
      setBar(response.data.exp - 200)
    } else if (response.data.exp > 100) {
      setBar(response.data.exp - 100)
    }
    
  }
  const navigate = useNavigate()
  // const handleClick = () => {
  //   console.log("hi")
  //   getExp();
  //   setBar(bar+20)
  //   if (bar + 20>=100){
  //     setBar(0)
  //   }
  //   setExp(exp + 20)
  // }

  useEffect(() => {
    setHasPrediction(false)
  },[])
  // reroutes when geus is max level
  useEffect(() => {
    if (exp >= 300) {
      navigate("/end");
    }
  }, [exp, navigate]);

  useEffect(() => {
    if (exp >= 100 && exp < 200) {
      setLevel(50); // Set level to 50
      setImage("./robot_goose.png")
      setText(textArr[1])
    } else if (exp >= 200) {
      setLevel(100); // Set level to 100
      setImage("./goose.png")
      setText(textArr[2])
    } else {
      setLevel(0); // Reset level if below 100
    }
  }, [exp, bar]);  
    
  
    useEffect(() => {
      
      // Connect to the WebSocket server
      const socket = io('http://127.0.0.1:5000');  // Replace with your server URL
  
      // Set the socket instance in state
  
      // Listen for messages from the server
      socket.on('send-new-data', (data: data) => {
        console.log('Received message:', data);
        // setExp(data.exp);  // Update the state with received message
        // setLevel(data.lvl);
        if (data.label == "goose"){
          setPrediction("It's a Goose!");
          // setBar((bar + 20))
        }else if (data.label == "baby goose") {
          // setBar((bar + 40))
          setPrediction("It's a baby goose!")
        } else {
          setPrediction("It's not a goose!");
        }
        setHasPrediction(true)
      }, );
  
    
      // Clean up when the component unmounts
      return () => {
        socket.disconnect();
      };
    }, []);
    
    // const handlePostData = async () => {
    //   const response = await axios.post('http://127.0.0.1:3000/api/post-data',{
    //     exp: exp,
    //     lvl: level
    //   })
    //   console.log(response.data)
    // }
  return (
    <main className="w-full min-h-screen bg-sky-200 flex items-center justify-center p-4">
      <div className="border-black border-4 bottom-0 left-0 h-[250px] w-[550px] absolute bg-white z-10 text-black">
        <div className="m-5">
          {text}
        </div>
      </div>
      <div className="relative w-full max-w-4xl aspect-[16/9] bg-sky-300 border-4 border-black shadow-lg ">
        {/* Background Image */}
      
        <img

          src="/background.png"
          alt="Goose game scene"
          className="object-cover "
        /> 
        
        {/* Navigation */}
        <nav className="absolute top-4 right-4 flex gap-4 ">
          <Link to="/goose" className="px-4 py-2 bg-black text-white font-pixel rounded-lg hover:bg-gray-800 transition-colors">
            GOOSE
          </Link>
          <Link to="/map" className="px-4 py-2 bg-black text-white font-pixel rounded-lg hover:bg-gray-800 transition-colors" 
          // onClick={handlePostData}
          >
            MAP
          </Link>
          
        </nav>
      
      
        {/* Main Character */}
        <div className="absolute left-1/2 top-[65%] transform -translate-x-1/2 -translate-y-1/2" >
        { hasPrediction ? 
        <div className="bg-white border-4 border-black text-black text-center rounded-md">{prediction}</div> : null }

        <div className=" hover:scale-125" 
        // onClick={handleClick}
        >
          <img
            src={image} 
            className="w-80 h-80"
            alt="Goose"
          />
          </div>
        </div>

        {/* Status Bars */}
        <StatusBars bar={bar} level={level} />
      </div>
    </main>
  );
}

function StatusBars({ bar, level }: { bar: number, level: number }) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-4 items-start">
      {/* Stack the labels and bars vertically with spacing, aligned to the left */}
      <StatusBar label="EXP" value={bar} color="bg-yellow-400" />
      <StatusBar label="LVL" value={level} color="bg-green-400" />
    </div>
  );
}

function StatusBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-black text-xl">{label}</span>
      <div className="w-48 h-8 bg-sky-100 border-2 border-black rounded-lg">
        <div className={`h-full rounded-lg ${color}`} style={{ width: `${(value / 100) * 100}%` }} />
      </div>
    </div>
  );
}




