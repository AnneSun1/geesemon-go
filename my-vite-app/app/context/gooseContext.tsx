// import React, { createContext, useContext, useState } from 'react';

// interface GooseContextType {
//   exp: number;
//   level: number;
//   gainExp: (amount: number) => void;
//   resetGoose: () => void;
// }

// const GooseContext = createContext<GooseContextType | undefined>(undefined);

// export const GooseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [exp, setExp] = useState(0);
//   const [level, setLevel] = useState(1);

//   const gainExp = (amount: number) => {
//     setExp((prevExp) => {
//       const newExp = prevExp + amount;
//       if (newExp >= 100) {
//         setLevel((prevLevel) => prevLevel + 1);
//         return newExp - 100; // Reset exp for next level
//       }
//       return newExp;
//     });
//   };

//   const resetGoose = () => {
//     setExp(0);
//     setLevel(1);
//   };

//   return (
//     <GooseContext.Provider value={{ exp, level, gainExp, resetGoose }}>
//       {children}
//     </GooseContext.Provider>
//   );
// };

// export const useGoose = (): GooseContextType => {
//   const context = useContext(GooseContext);
//   if (!context) {
//     throw new Error('useGoose must be used within a GooseProvider');
//   }
//   return context;
// };
