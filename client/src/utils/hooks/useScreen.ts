import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useScreenMonitor = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCount((prevCount) => {
          const newCount = prevCount + 1;
        //   console.log(`Screen switch count: ${newCount}`);

          if (newCount >= 5) {
            alert("You have switched screens multiple times. Your interview is now terminated.");
            navigate("/dashboard"); 
          } else {
            alert(
              "Please stay on this screen throughout the session. If you switch screens multiple times, your interview will be terminated."
            );
          }

          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate]);

  return count; 
};

export default useScreenMonitor;
