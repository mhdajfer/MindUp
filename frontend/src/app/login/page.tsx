"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Response } from "../types/Response";
import { axiosInstance } from "@/utils/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { IUser } from "../types/IUser";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    const { email, password } = data;

    try {
      const {
        data,
      }: {
        data: { success: boolean; message: string; data: string; user: IUser };
      } = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      if (data.success) {
        Cookies.set("accessToken", data.data);
        router.push(`${data.user.role === "admin" ? "/admin" : "/dashboard"}`);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.error);
      } else {
        toast.error("something went wrong, try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900 p-4">
      <Card className="w-full max-w-md shadow-lg border-violet-200 dark:border-violet-800 bg-gray-200 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login to MindUp
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative flex items-center justify-center w-full">
            <div className="border-t border-gray-300 dark:border-gray-700 w-full"></div>
            <div className="absolute bg-white dark:bg-gray-950 px-2 text-sm text-gray-500"></div>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-violet-600 hover:text-violet-800 dark:text-violet-400 font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
