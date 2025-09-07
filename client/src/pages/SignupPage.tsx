import { cn } from "@/utils/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase/firebase";
import { registerUser } from "@/api/user.api";
import { useNotification } from "@/components/Notifications/NotificationContext";
import { Notification } from "@/vite-env";

export function SignupPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firebaseUid, setFirebaseUid] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // console.log((result as any)._tokenResponse);
      setName((result as any)._tokenResponse.displayName);
      setEmail((result as any)._tokenResponse.email);
      setFirebaseUid((result as any)._tokenResponse.user_id);
      setPassword(`${Math.random() * 1000000}`);
      const formData = {
        name,
        email,
        password,
        firebaseUid: firebaseUid || "",
      };
      const response = await registerUser(formData);
      response;
      // console.log("Response", response);
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "success",
        message: "User Registered Successfully",
      };
      addNotification(newNotification);
      navigate("/login");
    } catch (error) {
      // console.error("Test", error);
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "error",
        message: `${(error as any).response.data.error}`,
      };
      addNotification(newNotification);
    }
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const formData = {
        name,
        email,
        password,
        firebaseUid: firebaseUid || "",
      };
      await registerUser(formData);
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "success",
        message: "User Registered Successfully",
      };
      addNotification(newNotification);
      navigate("/login");
    } catch (error) {
      // console.error("Test", (error as any).response.data);
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "error",
        message: `${(error as any).response.data.error}`,
      };
      addNotification(newNotification);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className={cn("flex flex-col gap-6 lg:w-80 max-w-6xl", className)}
        {...props}
      >
        <Card className="bg-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="text-red-500" />
                      ) : (
                        <EyeOff />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <Eye className="text-red-500" />
                      ) : (
                        <EyeOff />
                      )}
                    </button>
                  </div>
                </div>
                <Button onClick={handleSignup} className="w-full">
                  Sign Up
                </Button>
              </div>
              <Button
                onClick={handleGoogleSignup}
                variant="outline"
                className="w-full mt-2"
              >
                Continue with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
