"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import AuthShell from "@/src/components/AuthShell";
import PasswordInput from "@/src/components/PasswordInput";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/signup", form);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      description="Join Eocean and start communicating smarter."
      panelTitle="Start building smarter conversations"
      panelCopy="Your workspace for AI-powered messaging, voice and customer communication — ready in minutes."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-slate-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Choose a username"
            required
            minLength={3}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-eocean-blue focus:ring-2 focus:ring-eocean-blue/15"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
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
          placeholder="Create a strong password"
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-eocean-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eocean-blue/40 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="font-semibold text-eocean-blue transition hover:text-blue-700 hover:underline"
        >
          Sign in
        </button>
      </div>
    </AuthShell>
  );
}