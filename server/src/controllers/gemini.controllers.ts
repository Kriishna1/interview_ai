import axios from "axios";
import { raw, Request, Response } from "express";
import dotenv from "dotenv";
import { Question } from "../types/express";
import MockInterviewModel, { MockInterview } from "../models/mockinterview.model";
import exp from "constants";

dotenv.config();

function extractAndParseJSONQuestion(responseText: string) {
  try {
    // Extract JSON content from the text by removing triple backticks and "json" label
    const jsonString = responseText.replace(/```json\n|\n```/g, "");

    // Parse the extracted JSON string
    const parsedData = JSON.parse(jsonString);

    // Add answer and review fields to each question
    if (parsedData.questions && Array.isArray(parsedData.questions)) {
      parsedData.questions = parsedData.questions.map((question: Question) => ({
        ...question,
        answer: "",
        review: "",
      }));
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

function extractAndParseJSON(responseText: string) {
  try {
    // Extract JSON content from the text by removing triple backticks and "json" label
    const jsonString = responseText.replace(/```json\n|\n```/g, "");

    // Parse the extracted JSON string
    const parsedData = JSON.parse(jsonString);

    // Add answer and review fields to each question
    if (parsedData.questions && Array.isArray(parsedData.questions)) {
      parsedData.questions = parsedData.questions.map((question: Question) => ({
        ...question,
      }));
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

const generateQuestions = async (
  category: string,
  interviewID: string,
  userId: string,
  skills: string[] = []
) => {
  let jobRole: string | undefined;
  let experienceLevel: string | undefined;
  let company: string | undefined;

  const mockInterview = await MockInterviewModel.findOne({
    _id: interviewID,
    user: userId,
  });

  if (!mockInterview) {
    throw new Error("Mock interview not found");
  }

  jobRole = mockInterview.jobRole;
  skills = mockInterview.skills || [];
  company = mockInterview.targetCompany;
  experienceLevel = mockInterview.experienceLevel;

  if (!jobRole || !company || !experienceLevel) {
    throw new Error("All fields are required");
  }

  const prompt = `Generate a JSON response containing 10 detailed ${category} interview questions tailored to assess a candidate's skills and expertise based on the following criteria:

  Tech Stack: ${skills.join(", ")}
  Experience Level: ${experienceLevel}
  Company: ${company}
  Job Role: ${jobRole}

  Question Types:
  ${category === "DSA" ? "" : ""}
  - Conceptual Questions: Questions that test theoretical knowledge.
  - Scenario-Based Questions: Real-world scenarios that evaluate problem-solving abilities.

  Output Format:
  {
    "questions": [
      { "type": "Conceptual", "technology": "Node.js", "question": "Explain the event loop in Node.js and how it handles asynchronous operations." },
      { "type": "Scenario", "technology": "MongoDB", "question": "You need to optimize a MongoDB query for a large dataset. Describe your approach." }
    ]
  }

  Ensure the questions are relevant and aligned with the provided technologies. Use a balanced mix of difficulty levels appropriate for the experience level. Provide example inputs and outputs for practical tasks when needed. Important: Return only the JSON format in your response with no extra text or explanations.`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const responseData = response.data.candidates[0].content.parts[0].text;
    return extractAndParseJSONQuestion(responseData) || { questions: [] };
  } catch (error: any) {
    console.error(`Error generating ${category} questions:`, error.message);
    return { questions: [] };
  }
};

// **Modified functions that return responses instead of sending them**
export const generateDSAQuestions = async (
  interviewID: string,
  userId: string
) => {
  return generateQuestions("DSA", interviewID, userId);
};

export const generateTechStackQuestions = async (
  interviewID: string,
  userId: string,
  skills: string[]
) => {
  return generateQuestions("Tech Stack", interviewID, userId, skills);
};

export const generateCoreSubjectQuestions = async (
  interviewID: string,
  userId: string
) => {
  return generateQuestions("Core Subjects", interviewID, userId, [
    "OS",
    "OOPs",
    "System Design",
  ]);
};

// **Parent function that calls all three and merges responses**
export const GenerateIntervieQuestions = async (
  req: Request,
  res: Response
) => {
  const { interviewID, skills } = req.body as {
    interviewID: string;
    skills: string[];
  };
  const userId = req.user._id;

  if (!interviewID) {
    return res.status(400).json({ error: "Interview ID is required" });
  }

  try {
    const [dsaQuestions, techStackQuestions, coreSubjectQuestions] =
      await Promise.all([
        generateDSAQuestions(interviewID, userId),
        generateTechStackQuestions(interviewID, userId, skills),
        generateCoreSubjectQuestions(interviewID, userId),
      ]);

    const mergedQuestions = {
      dsaQuestions: dsaQuestions.questions || [],
      techStackQuestions: techStackQuestions.questions || [],
      coreSubjectQuestions: coreSubjectQuestions.questions || [],
    };

    return res.status(200).json(mergedQuestions);
  } catch (error: any) {
    console.error("Error generating interview questions:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GenerateReview = async (req: Request, res: Response) => {
  const { InterviewDetailsObject } = req.body as {
    InterviewDetailsObject: MockInterview;
  };

  if (!InterviewDetailsObject) {
    return res.status(400).json({ message: "Invalid request format" });
  }

  // const InterviewDetailsObject: any = {
  //   _id: "6795d666dc37ffb7ea41f932",
  //   user: "6795b233e1b51c2c483907ed",
  //   jobRole: "SDE",
  //   overallReview: "",
  //   overallRating: 0,
  //   experienceLevel: "Junior",
  //   targetCompany: "any",
  //   skills: ["C++", "Java"],
  //   dsaQuestions: [
  //     {
  //       question:
  //         "Explain the difference between `const int* ptr` and `int * const ptr` in C++.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827c5",
  //     },
  //     {
  //       question:
  //         "Explain the concept of polymorphism in Java and provide a code example illustrating its use.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827c6",
  //     },
  //     {
  //       question:
  //         "Write a C++ function to reverse a linked list.  Provide example input and output.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827c7",
  //     },
  //     {
  //       question:
  //         "Design a Java class representing a simple bank account. Include methods for deposit, withdrawal, and checking balance.  Handle potential exceptions (e.g., insufficient funds).",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827c8",
  //     },
  //     {
  //       question:
  //         "Explain the difference between a shallow copy and a deep copy in C++ and when you would use each.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827c9",
  //     },
  //     {
  //       question:
  //         "Write a Java program to find the second largest element in an integer array. Handle edge cases like arrays with less than two elements.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827ca",
  //     },
  //     {
  //       question:
  //         "Explain the difference between an interface and an abstract class in Java. When would you choose one over the other?",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827cb",
  //     },
  //     {
  //       question:
  //         "Implement a C++ function that checks if a given string is a palindrome (reads the same forwards and backward).",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827cc",
  //     },
  //     {
  //       question:
  //         "You are given a list of integers. Write a Java function to efficiently find the kth largest element.  Explain the time and space complexity of your solution.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827cd",
  //     },
  //     {
  //       question:
  //         "Explain the concept of RAII (Resource Acquisition Is Initialization) in C++ and its benefits.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827ce",
  //     },
  //   ],
  //   technicalQuestions: [
  //     {
  //       question:
  //         "Explain the difference between `malloc` and `new` in C++ and when you would use each.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827cf",
  //     },
  //     {
  //       question:
  //         "Describe the concept of inheritance in Java. Explain the different types of inheritance and their use cases with examples.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d0",
  //     },
  //     {
  //       question:
  //         "You need to write a C++ function that reverses a given string.  Write the function and explain its time and space complexity.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d1",
  //     },
  //     {
  //       question:
  //         "Design a Java class to represent a simple bank account.  It should include methods to deposit, withdraw, and check the balance.  Consider error handling for insufficient funds.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d2",
  //     },
  //     {
  //       question:
  //         "Explain the difference between a stack and a heap in C++ memory management.  Provide examples of when you would use each.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d3",
  //     },
  //     {
  //       question:
  //         "What is the difference between `==` and `.equals()` when comparing strings in Java? Explain with examples.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d4",
  //     },
  //     {
  //       question:
  //         "Write a C++ function that finds the largest element in an integer array. Explain its efficiency.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d5",
  //     },
  //     {
  //       question:
  //         "You are given a list of integers. Write a Java program to find the sum of all even numbers in the list.  Handle potential exceptions (e.g., null list).",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d6",
  //     },
  //     {
  //       question:
  //         "What are pointers in C++ and how are they used? Explain with examples and potential pitfalls.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d7",
  //     },
  //     {
  //       question:
  //         "Implement a simple Java program that reads a file, counts the number of lines, and prints the count to the console.  Handle potential file I/O exceptions.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d8",
  //     },
  //   ],
  //   coreSubjectQuestions: [
  //     {
  //       question:
  //         "Explain the difference between `const int* ptr` and `int* const ptr` in C++.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827d9",
  //     },
  //     {
  //       question:
  //         "Describe the difference between `==` and `.equals()` when comparing Strings in Java. Provide examples.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827da",
  //     },
  //     {
  //       question:
  //         "You are given a linked list. Write a C++ function to reverse the linked list.  Provide example inputs and outputs.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827db",
  //     },
  //     {
  //       question:
  //         "You need to design a Java program to read data from a CSV file and store it in a database. Describe your approach, including error handling.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827dc",
  //     },
  //     {
  //       question:
  //         "Explain polymorphism in C++ and provide an example using virtual functions.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827dd",
  //     },
  //     {
  //       question:
  //         "Explain the concept of exception handling in Java.  What are checked and unchecked exceptions?",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827de",
  //     },
  //     {
  //       question:
  //         "Write a C++ function to implement a binary search algorithm on a sorted array. Provide example inputs and outputs.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827df",
  //     },
  //     {
  //       question:
  //         "Describe how you would implement a simple queue data structure in Java using an array. Explain potential issues and limitations.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827e0",
  //     },
  //     {
  //       question:
  //         "What are smart pointers in C++ and why are they important?  Give examples of different smart pointer types.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827e1",
  //     },
  //     {
  //       question:
  //         "You are given a string containing multiple words separated by spaces. Write a Java program to count the number of occurrences of each word. Provide example inputs and outputs.",
  //       answer: "",
  //       review: "",
  //       _id: "679dc1cb1c40a9d0af0827e2",
  //     },
  //   ],
  //   createdAt: "2025-01-26T06:29:58.858Z",
  //   updatedAt: "2025-02-01T06:40:11.126Z",
  //   __v: 0,
  // };

  const InterviewDetails = JSON.stringify(InterviewDetailsObject);

  const reviewPrompt = `
  You are an AI designed to evaluate technical interview responses. Given an interview object in JSON format, your task is to analyze the provided answers and generate the following:

  - Review for each question – Provide constructive feedback on the answer's correctness, completeness, and clarity. If an answer is missing, note that it needs to be filled.
  - Overall Rating – Assign a rating (on a scale from 1 to 5) based on the accuracy and depth of the provided answers.
  - Unchanged Structure – Maintain the original JSON structure, only updating the review fields for each question and setting the overallRating.
  - JSON-Only Output – Your response must contain only the updated JSON object and no additional text or explanation.

  Evaluation Criteria:
  - Correctness: Does the answer correctly address the question?
  - Completeness: Does it cover key points?
  - Clarity: Is the explanation clear and well-structured?
  - Edge Cases Consideration: Does the response handle different scenarios appropriately?

  JSON Input Example:
  {
      "_id": "6795d666dc37ffb7ea41f932",
      "user": "6795b233e1b51c2c483907ed",
      "jobRole": "SDE",
      "overallReview": "",
      "overallRating": 0,
      "experienceLevel": "Junior",
      "targetCompany": "any",
      "skills": ["C++", "Java"],
      "dsaQuestions": [
          {
              "question": "Explain polymorphism in Java and provide a code example.",
              "answer": "Polymorphism allows a class to take different forms. Example: \`class Animal { void sound() { } } class Dog extends Animal { void sound() { System.out.println(\\"Bark\\"); } }\`",
              "review": "",
              "_id": "679dc1cb1c40a9d0af0827c6"
          }
      ],
      "technicalQuestions": [],
      "coreSubjectQuestions": [],
      "createdAt": "2025-01-26T06:29:58.858Z",
      "updatedAt": "2025-02-01T06:40:11.126Z",
      "__v": 0
  }

  Expected Output:
  The AI should fill the review fields with feedback for each answer.
  It should compute an overallRating between 1 and 5 based on answer quality.
  The output must preserve the original structure without adding new fields or modifying existing keys.
  The response must only include the JSON object with the updates. No additional text or explanation should be provided.

  Example Output:
  {
      "_id": "6795d666dc37ffb7ea41f932",
      "user": "6795b233e1b51c2c483907ed",
      "jobRole": "SDE",
      "overallReview": "The candidate provided good explanations for core concepts, but some answers lacked depth in edge cases.",
      "overallRating": 4.5,
      "experienceLevel": "Junior",
      "targetCompany": "any",
      "skills": ["C++", "Java"],
      "dsaQuestions": [
          {
              "question": "Explain polymorphism in Java and provide a code example.",
              "answer": "Polymorphism allows a class to take different forms. Example: \`class Animal { void sound() { } } class Dog extends Animal { void sound() { System.out.println(\\"Bark\\"); } }\`",
              "review": "Good explanation of polymorphism with an example. However, it would be better to mention compile-time vs. runtime polymorphism and include method overloading.",
              "_id": "679dc1cb1c40a9d0af0827c6"
          }
      ],
      "technicalQuestions": [],
      "coreSubjectQuestions": [],
      "createdAt": "2025-01-26T06:29:58.858Z",
      "updatedAt": "2025-02-01T06:40:11.126Z",
      "__v": 0
  }

  InterviewDetails:
  ${InterviewDetails}
`;

  // console.log("Review Prompt", reviewPrompt);

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: reviewPrompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );
    // console.log(
    //   "Resposnse Data",
    //   response.data.candidates[0].content.parts[0].text
    // );
    const responseData = response.data.candidates[0].content.parts[0].text;
    const generatedResponse = extractAndParseJSON(responseData) || "{}";
    // console.log("Parsed Data ", generatedResponse);
    // const jsonResponse = JSON.parse(generatedResponse);

    // save Interview 
    let interviewId = InterviewDetailsObject._id;
    let interview  = await MockInterviewModel.findOne({"_id":interviewId});
    console.log(interview);
    if (interview) {
      interview.dsaQuestions = generatedResponse.dsaQuestions;
      interview.technicalQuestions = generatedResponse.technicalQuestions;
      interview.coreSubjectQuestions = generatedResponse.coreSubjectQuestions;
      interview.overallRating = generatedResponse.overallRating;
      interview.overallReview = generatedResponse.overallReview;
      await interview.save();
    } else {
      return res.status(404).json({ error: "Interview not found" });
    }
    return res.status(200).json({"message":"success"});
  } catch (error: any) {
    console.error(
      "Error generating review:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
