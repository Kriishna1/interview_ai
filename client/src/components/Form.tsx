import { createInterview } from "@/api/mockinterview.api";
import { useState, useRef, KeyboardEvent } from "react";
import { ExperienceLevel } from "@/vite-env";
import { useNotification } from "@/components/Notifications/NotificationContext";
import { Notification } from "@/vite-env";
const Form = () => {
  const { addNotification } = useNotification();
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [jobProfile, setJobProfile] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("Fresher");
  const [targetCompany, setTargetCompany] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      setTags([...tags, input.trim()]);
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      e.preventDefault();
      const newTags = [...tags];
      const poppedTag = newTags.pop();
      setTags(newTags);
      setInput(poppedTag || "");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    inputRef.current?.focus();
  };

  const handleCreateInterview = async () => {
    // console.log("Create Interview");
    try {
      let validateForm = true;
      if (jobProfile === "" || tags.length === 0 || targetCompany === "") {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "warning",
          message: "Please fill all the fields",
        };
        addNotification(newNotification);
        validateForm = false;
      }
      if (validateForm) {
        const skills = tags;
        const formData = {
          jobRole: jobProfile,
          experienceLevel,
          skills,
          targetCompany,
          overallReview: "",
          overallRating: 0,
          dsaQuestions: [],
          technicalQuestions: [],
          coreSubjectQuestions: [],
        };
        // console.log("FormData:", formData);
        await createInterview(formData);
        // console.log("Response:", response);
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "success",
          message: "Interview Created Successfully",
        };
        addNotification(newNotification);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      // console.error("Error creating interview:");
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "error",
        message: "Error creating interview",
      };
      addNotification(newNotification);
    }
  };

  return (
    <div className="w-screen h-screen fixed p-10 z-10 bg-black/80 flex justify-center items-center">
      <div className="relative flex w-full max-w-[24rem] flex-col rounded-lg bg-white border border-slate-200 shadow-sm">
        <div className="relative m-2.5 items-center flex flex-col justify-center text-white h-32 rounded-md bg-green-400">
          <div className="mb-4 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-10 w-10 text-white"
            >
              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z"></path>
              <path
                fillRule="evenodd"
                d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <h5 className="text-white text-xl">Create New Interview</h5>
        </div>
        <div className="p-6">
          <div className="block overflow-visible">
            <div className="w-full">
              <div className="relative right-0">
                <div className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100">
                  <div className="z-30 flex-auto text-center">
                    <a className="z-30 flex items-center justify-center w-fdiv px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit">
                      Interview Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative block w-full overflow-hidden !overflow-x-hidden !overflow-y-visible bg-transparent">
              <div role="tabpanel">
                <div className="mt-8 flex flex-col">
                  <div className="w-full max-w-sm min-w-[200px]">
                    <label className="block mb-2 text-sm text-slate-600">
                      Job Profile
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setJobProfile(e.target.value)}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder="Enter Job Profile"
                    />
                  </div>
                  <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <label className="mb-1 block text-sm text-slate-600">
                      Experience Level
                    </label>
                    <select
                      onChange={(e) =>
                        setExperienceLevel(e.target.value as ExperienceLevel)
                      }
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="Fresher">Fresher</option>
                      <option value="Junior">Junior</option>
                      <option value="Mid-level">Mid-level</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>
                  <div className="w-full mx-auto mt-8">
                    <label className="mb-1 block text-sm text-slate-600">
                      Skills
                    </label>
                    <div className="border-2 border-gray-200 text-sm rounded-md p-1 focus-within:border-gray-200 min-h-[35px] flex flex-wrap content-start">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-md flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-1.5 text-gray-600 hover:text-gray-800 focus:outline-none"
                            aria-label={`Remove ${tag}`}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow outline-none text-gray-700 min-w-[50px] h-8"
                        placeholder={
                          tags.length === 0 ? "Type and press Enter" : ""
                        }
                        aria-label="Add a tag"
                      />
                    </div>
                  </div>

                  <label className="mt-4 block mb-1 text-sm text-slate-600">
                    Target Company
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Example Company"
                  />

                  <button
                    type="button"
                    onClick={handleCreateInterview}
                    className="w-full mt-6 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Create Interview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
