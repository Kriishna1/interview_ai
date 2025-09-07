'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"

export function Timer() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="fixed bottom-4 right-4 bg-zinc-800/90 border-zinc-700 p-4">
      <div className="text-2xl font-mono text-white tabular-nums">
        {formatTime(time)}
      </div>
    </Card>
  )
}

