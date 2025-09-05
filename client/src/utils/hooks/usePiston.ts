import { useState } from "react";

// Use the provided language versions
export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python3: "3.10.0", // Piston uses "python3" for Python.
  java: "15.0.2",
  cpp: "10.2.0",
};

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

/**
 * Returns the valid runtime version for the given language.
 * Expects the language parameter to be one of the Piston identifiers
 * (e.g. "javascript", "typescript", "python3", "java", "cpp").
 */
const getVersionForLanguage = (language: keyof typeof LANGUAGE_VERSIONS): string => {
  return LANGUAGE_VERSIONS[language] || "18.15.0";
};

export const usePiston = () => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async (code: string, language: keyof typeof LANGUAGE_VERSIONS, input: string) => {
    setIsLoading(true);
    setOutput("");
    setError("");

    try {
      const version = getVersionForLanguage(language);

      const body = {
        language, // e.g., "python3", "javascript", "cpp", etc.
        version,  // Use our helper to get the proper version string
        files: [
          {
            // The filename is arbitrary; you may adjust the extension if desired.
            name: `main.${language}`,
            content: code,
          },
        ],
        stdin: input,
        args: [],
      };

      const response = await fetch(PISTON_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();

      // Piston returns the run output under result.run.output
      if (result.run && result.run.output) {
        setOutput(result.run.output);
      } else {
        setError("No output received.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while running the code.");
    } finally {
      setIsLoading(false);
    }
  };

  return { runCode, output, error, isLoading };
};
