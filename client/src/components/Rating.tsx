import React from "react";
import { Star, StarHalf } from "lucide-react"; // Using Lucide React for icons

interface RatingProps {
  experienceLevel: string;
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ experienceLevel, rating }) => {
  const getColor = () => {
    switch (experienceLevel.toLowerCase()) {
      case "fresher":
        return "text-blue-500";
      case "senior":
        return "text-amber-500";
      case "mid-level":
        return "text-amber-500";
      default:
        return "text-gray-500"; // Default for Mid-Level
    }
  };

  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(filledStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`w-6 h-6 ${getColor()}`}
          fill="currentColor"
        />
      ))}
      {hasHalfStar && <StarHalf className={`w-6 h-6 ${getColor()}`} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-6 h-6 text-gray-300" />
      ))}
    </div>
  );
};

export default Rating;
