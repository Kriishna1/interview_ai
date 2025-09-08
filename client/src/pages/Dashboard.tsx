import React, { useEffect, useState } from "react";
import InterviewCard from "../components/InterviewCard";
import Loader from "../components/Loader/Loader";
import Hero from "../components/Hero";
import { getAllInterviews } from "@/api/mockinterview.api";
import Navbar from "@/components/Navbar";
import { getUser } from "@/api/user.api";
import { useNotification } from "@/components/Notifications/NotificationContext";
import { Notification } from "@/vite-env";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    const validateLogin = async () => {
      try {
        await getUser();
      } catch (error) {
        console.error("Error", error);
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "error",
          message: "User not Authorized",
        };
        addNotification(newNotification);
        navigate("/login");
      }
    };
    const fetchInterviews = async () => {
      try {
        const response = await getAllInterviews();
        setInterviews(response);
        // console.log("Interviews", response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "error",
          message: "Error in Fetching Interviews",
        };
        addNotification(newNotification);
      }
    };
    validateLogin();
    fetchInterviews();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        <Loader />{" "}
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container pt-32 mx-auto px-4 md:px-10 py-8">
        <Hero />
        <h2 className="text-2xl mt-10 font-semibold mb-4 text-gray-200">
          Past Interviews
        </h2>
        {interviews.length === 0 && (
          <div className="text-gray-400 text-center w-full">
            No Interviews Found
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.length > 0 &&
            interviews.map((interview, index) => (
              <InterviewCard key={index} interview={interview} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
