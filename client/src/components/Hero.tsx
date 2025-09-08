import { X } from "lucide-react";
import { useState } from "react";
import Form from "../components/Form";
const Hero = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const handleFormOpen = () => {
    setFormOpen(!isFormOpen);
  };

  if (isFormOpen)
    return (
      <div className="bg-black/80 w-screen h-screen fixed top-0 left-0 z-30">
        <Form />
        <button
          className="rounded-full z-10 fixed top-3 right-5 text-white border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg  hover:text-slate-600 hover:bg-slate-200 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleFormOpen}
        >
          <X />
        </button>
      </div>
    );

  return (
    <div>
      <section className="pt-24">
        <div className="px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                AI-Powered
              </span>{" "}
              <span className="text-white"> Mock Interviews</span> <span></span>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-200 md:text-xl lg:px-24">
              Practice, Prepare, and Succeed!
            </p>
            <div className="mb-4  md:mb-8">
              <button
                onClick={handleFormOpen}
                className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0"
              >
                Create Interview
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
    </div>
  );
};

export default Hero;
