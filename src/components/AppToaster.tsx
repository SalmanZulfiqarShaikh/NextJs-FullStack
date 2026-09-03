"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{ top: 12 }}
      toastOptions={{
        style: {
          borderRadius: "0.85rem",
          background: "#0c1f4a",
          color: "#f1f5f9",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 45px -20px rgba(2,8,26,0.9)",
          fontSize: "0.875rem",
          padding: "0.75rem 1rem",
        },
        success: {
          iconTheme: { primary: "#22d3ee", secondary: "#061331" },
        },
        error: {
          iconTheme: { primary: "#fb7185", secondary: "#061331" },
        },
      }}
    />
  );
}
