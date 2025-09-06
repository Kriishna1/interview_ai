"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InterviewInfoProps {
  onStartInterview: () => void;
}

export default function InterviewInstructions({
  onStartInterview,
}: InterviewInfoProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-zinc-900 text-gray-100 border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Important Interview Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive" className="border-red-900 bg-red-950">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You must maintain fullscreen mode throughout the interview. Exiting
            fullscreen mode multiple times will terminate the interview session.
          </AlertDescription>
        </Alert>

        <div className="space-y-3 text-gray-300">
          <p className="leading-relaxed">Please ensure you have:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A stable internet connection to prevent interruptions</li>
            <li>A quiet environment for clear audio recording</li>
            <li>Your camera and microphone properly set up</li>
            <li>Enough time to complete the interview without interruption</li>
            <li>
              Once you proceed to the next question, you will <span className="text-red-400">not be able to
              return to the previous one.</span> Ensure you review and save your
              response before moving forward.
            </li>
          </ul>

          <p className="mt-4 text-yellow-400">
            Note: If you refresh the page, the interview will restart from the
            beginning.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-4">
        <Button
          onClick={onStartInterview}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 text-lg"
        >
          Start Interview
        </Button>
      </CardFooter>
    </Card>
  );
}
