"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name");

  const logOut = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    router.push("/login");
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
  }
};

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Your Profile
        </h1>

        <p className="mt-2 text-zinc-400">
          Thanks for logging in,{" "}
          <span className="font-medium text-white">
            {name}
          </span>
        </p>

        <button
          onClick={logOut}
          className="mt-6 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}