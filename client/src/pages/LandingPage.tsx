import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  Calendar,
  Mic,
  Monitor,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleClick = () => {
    navigate("/login");
  };

  const features = [
    {
      title: "AI-Powered Mock Interviews",
      description:
        "Experience real-world interview scenarios with our advanced AI, tailored to your tech stack and role.",
      icon: Brain,
    },
    {
      title: "Customizable Scheduling",
      description:
        "Schedule interviews at your convenience and customize them based on your target role and tech preferences.",
      icon: Calendar,
    },
    {
      title: "Speech-to-Text Integration",
      description:
        "Get real-time transcription of your responses for instant feedback on technical and communication skills.",
      icon: Mic,
    },
    {
      title: "Screen Recording & Analysis",
      description:
        "Review recorded sessions to track progress and analyze your performance during technical assessments.",
      icon: Monitor,
    },
    {
      title: "Comprehensive Review System",
      description:
        "Receive detailed, actionable feedback highlighting your strengths and areas for improvement.",
      icon: ClipboardList,
    },
    {
      title: "Real-Time Feedback",
      description:
        "Get instant AI feedback during interviews to improve your answers and communication style.",
      icon: MessageSquare,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  return (
    <div className="">
      <div className="py-12">
        <Navbar />
        <section className="pt-24">
          <div className="px-12 mx-auto max-w-7xl">
            <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
              <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                  AI-Powered
                </span>{" "}
                <span className="text-white"> Mock Interviews</span>{" "}
                <span></span>
              </h1>
              <p className="px-0 mb-8 text-lg text-gray-200 md:text-xl lg:px-24">
                Take your interview prep to the next level with AI-driven mock
                interviews. Get instant feedback, improve your communication
                skills, and boost your confidence—all in a realistic interview
                setting.
              </p>
              <div className="mb-4  md:mb-8">
                <button
                  onClick={handleClick}
                  className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0"
                >
                  Get Started
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full mx-auto mt-20 text-center md:w-10/12"></div>
          </div>
        </section>

        <div className="relative overflow-hidden">
          <div className="container">
            <div className="max-w-2xl text-center mx-auto"></div>
            <div className="mt-2 shadow-lg relative max-w-5xl mx-auto">
              <img
                src="/interface.png"
                className="rounded-xl"
                alt="Image Description"
              />
              <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
                <div className="w-48 h-48 rounded-lg bg-background/10" />
              </div>
              <div className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
                <div className="w-48 h-48 rounded-full bg-background/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 bg-zinc-950">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12   text-white">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 text-white"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feature.icon className="w-6 h-6 text-green-400" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <footer className="py-6 bg-zinc-900 border-t border-zinc-800">
        <div className="container flex flex-col items-center gap-2 text-center text-sm text-zinc-400">
          <p>Developed by Kriishna1</p>
          <a
            href="https://github.com/kriishna1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            GitHub Profile
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
