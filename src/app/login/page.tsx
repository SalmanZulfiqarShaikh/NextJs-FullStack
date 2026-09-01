
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Login to your account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Username or Email */}
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
              onChange={(e) =>
                setUser({
                  ...user,
                  identifier: e.target.value,
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
            className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
          >
            Log In
          </button>
        </form>

        {/* Signup */}
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
