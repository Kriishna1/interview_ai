import React, { useEffect, useState } from "react";
import { Question, Interview } from "../types/global";
import Rating from "../components/Rating";
import Loader from "../components/Loader/Loader";
import { getInterviewByID } from "@/api/mockinterview.api";
import { useParams } from "react-router-dom";

const QuestionList: React.FC<{ title: string; questions: Question[] }> = ({
  title,
  questions,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-4">
      <h3 className="text-lg text-zinc-100 font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {questions.map((q, index) => (
          <div key={index} className="rounded-md">
            <button
              className="w-full text-zinc-300 bg-zinc-900 text-left p-3 font-medium focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {q.question}
            </button>
            {openIndex === index && (
              <div className="p-3 bg-zinc-800">
                <p className="mb-2 text-zinc-100">
                  <strong className="text-green-500">Answer:</strong>{" "}
                  <div className="text-zinc-200">{q.answer}</div>
                </p>
                <p className=" text-zinc-100">
                  <strong className="text-pink-500">Review:</strong>{" "}
                  <div className="text-zinc-200">{q.review}</div>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export function InterviewDetails() {
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState<Interview>();
  const { id } = useParams();
  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const interviewId = id;
        const response = await getInterviewByID(interviewId || "");
        // console.log(response);
        setInterview(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInterviewData();
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
    <div className="h-full flex justify-center items-center pt-44 pb-20">
      <div className="w-full max-w-4xl mx-auto bg-zinc-600 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {interview && (
            <h2 className="text-2xl text-white font-bold mb-4">
              {interview.jobRole} Interview Details
            </h2>
          )}
          <div className="flex items-center justify-between mb-4">
            <span className="px-2 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm font-semibold">
              {interview?.experienceLevel}
            </span>
            <div className="flex items-center">
              <Rating
                experienceLevel={interview?.experienceLevel || ""}
                rating={interview?.overallRating || 0}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg text-zinc-200 font-semibold">
                Target Company
              </h3>
              <p className="text-zinc-300 ">{interview?.targetCompany}</p>
            </div>
            <div>
              <h3 className="text-lg text-zinc-200  font-semibold">
                Overall Review
              </h3>
              <p className="text-zinc-300 ">{interview?.overallReview}</p>
            </div>
            {interview?.dsaQuestions && (
              <QuestionList
                title="DSA Questions"
                questions={interview.dsaQuestions}
              />
            )}
            {interview?.technicalQuestions && (
              <QuestionList
                title="Technical Questions"
                questions={interview.technicalQuestions}
              />
            )}
            {interview?.coreSubjectQuestions && (
              <QuestionList
                title="Core Subject Questions"
                questions={interview.coreSubjectQuestions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
