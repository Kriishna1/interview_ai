"use client"

import { useEffect, useState } from "react"

export default function AudioVisualizer() {
  const [heights, setHeights] = useState<number[]>([])
  
  useEffect(() => {
    // Generate random heights periodically
    const interval = setInterval(() => {
      const newHeights = Array.from({ length: 32 }, () => 
        Math.random() * 100
      )
      setHeights(newHeights)
    }, 100) // Update every 100ms for smooth animation

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[60px]  p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl h-[50px] flex items-center gap-[2px]">
        {heights.map((height, i) => (
          <div
            key={i}
            className="flex-1 h-[40px] flex items-center justify-center"
          >
            <div 
              className="w-[3px] bg-gradient-to-b from-gray-100 via-green-400 to-green-800 transition-all duration-100 ease-in-out"
              style={{
                height: `${Math.max(5, height)}%`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

