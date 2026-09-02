"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user.identifier.trim()) {
      toast.error("Please enter your username or email");
      return;
    }

    if (!user.password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/login",
        user
      );

      if (response.status === 200) {
        toast.success("Login successful!");

        router.push(
          `/profile/${response.data.user.id}?name=${encodeURIComponent(
            response.data.user.username
          )}`
        );
      }
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Login to your account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {loading
              ? "Logging you in..."
              : "Sign in to continue"}
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="identifier"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Username or Email
            </label>

            <input
              type="text"
              name="identifier"
              id="identifier"
              value={user.identifier}
              placeholder="Enter your username or email"
              disabled={loading}
              onChange={(e) =>
                setUser({
                  ...user,
                  identifier: e.target.value,
                })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-1 focus:ring-white disabled:opacity-50"
            />
          </div>

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
              disabled={loading}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-1 focus:ring-white disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-white hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}