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
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { loginUser } from "@/api/user.api";
import { useNotification } from "../components/Notifications/NotificationContext";
import { Notification } from "@/vite-env";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase/firebase";

export function LoginPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const formData = {
      email,
      password,
    };
    try {
      await loginUser(formData);
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "success",
        message: "Login Successful",
      };
      addNotification(newNotification);
      navigate("/dashboard");
    } catch (error) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: "error",
        message: `${(error as any).response.data.message}`,
      };
      addNotification(newNotification);
    }
  };

  const handleGoogleSigin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        // console.log((result as any)._tokenResponse);
        const idToken = (result as any)._tokenResponse.idToken;
        await loginUser({firebaseUID: idToken});
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "success",
          message: "Login Sucessfull",
        };
        addNotification(newNotification);
        navigate("/dashboard");
      } catch (error) {
        // console.error("Test", error);
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "error",
          message: `${(error as any).response.data.message}`,
        };
        addNotification(newNotification);
      }
    };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className={cn("flex flex-col gap-6 max-w-4xl", className)}
        {...props}
      >
        <Card className="bg-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-6">
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
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
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
                <Button onClick={handleGoogleSigin} variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
