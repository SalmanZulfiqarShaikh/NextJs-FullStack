"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import AuthShell from "@/src/components/AuthShell";
import PasswordInput from "@/src/components/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", form);
      toast.success("Login successful");
      router.push(
        `/profile/${response.data.user.id}?name=${encodeURIComponent(response.data.user.username)}`
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Access your Eocean communication dashboard."
      panelTitle="Good to see you again"
      panelCopy="Sign in to keep the conversation going — across messaging, voice and every channel your business relies on."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="mb-1.5 block text-sm font-medium text-slate-700">
            Username or Email
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            placeholder="Enter your username or email"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-eocean-blue focus:ring-2 focus:ring-eocean-blue/15"
          />
        </div>

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={(password) => setForm({ ...form, password })}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-eocean-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eocean-blue/40 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => router.push("/signup")}
          className="font-semibold text-eocean-blue transition hover:text-blue-700 hover:underline"
        >
          Create one
        </button>
      </div>
    </AuthShell>
  );
}