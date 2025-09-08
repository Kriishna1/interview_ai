import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="space-y-8 text-center">
        {/* Animated Ghost Icon */}
        <div className="animate-bounce">
          <Ghost className="h-24 w-24 text-green-400 mx-auto" />
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-purple-500 to-white bg-clip-text text-transparent">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Oops! Page Not Found</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            It looks like you've taken a wrong turn. Don't worry, it happens to the best of us. Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-green-400 hover:bg-green-500 text-black">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-green-400/5 rounded-full blur-3xl" />
        <div className="absolute left-1/4 top-1/4 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

