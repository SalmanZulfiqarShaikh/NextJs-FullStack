"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) return;

    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log(response.data);

      toast.success("Account created successfully");

      router.push("/login");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {loading
              ? "Creating your account..."
              : "Sign up to get started"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              placeholder="Enter your username"
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              placeholder="you@example.com"
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating account..."
              : buttonDisabled
              ? "Please fill all fields"
              : "Sign Up"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-white hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
