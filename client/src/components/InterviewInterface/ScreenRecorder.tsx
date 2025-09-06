"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Monitor, StopCircle, Download, Trash2 } from "lucide-react";

export function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "monitor", // Hints at full-screen capture
          frameRate: { ideal: 30, max: 60 }, // Better performance
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        setShowDownloadDialog(true);
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting screen recording:", error);
      setIsRecording(false);
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          alert(
            "Screen recording permission was denied. Please allow access to your screen to record."
          );
        } else if (error.name === "NotFoundError") {
          alert(
            "No screen sharing source was found. Please make sure you have a display to share."
          );
        } else if (error.name === "NotReadableError") {
          alert(
            "Could not access your screen. Please check your hardware and try again."
          );
        } else {
          alert(
            `An error occurred while trying to start screen recording: ${error.message}`
          );
        }
      } else {
        alert(
          "An unexpected error occurred while trying to start screen recording. Please try again."
        );
      }
    }
  };

  const stopRecording = () => {
    try{
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    }catch(error){
       setError("An error occurred while trying to stop screen recording. Please try again.");
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(chunksRef.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screen-recording.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadDialog(false);
  };

  const discardRecording = () => {
    chunksRef.current = [];
    setShowDownloadDialog(false);
  };

  return (
    <>
      <Button
        variant={isRecording ? "destructive" : "default"}
        size="sm"
        onClick={isRecording ? stopRecording : startRecording}
        className="mr-2"
      >
        {isRecording ? (
          <>
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Recording
          </>
        ) : (
          <>
            <Monitor className="mr-2 h-4 w-4" />
            Record Screen
          </>
        )}
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <AlertDialog
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Screen Recording Completed</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to download or discard the recording?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={discardRecording}>
              <Trash2 className="mr-2 h-4 w-4" />
              Discard
            </AlertDialogCancel>
            <AlertDialogAction onClick={downloadRecording}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
