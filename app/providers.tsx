"use client";

import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1E1E1E",
            color: "#F3F4F6",
            border: "1px solid #2F2F2F",
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#22C55E", secondary: "#1E1E1E" },
          },
          error: {
            iconTheme: { primary: "#EF4444", secondary: "#1E1E1E" },
          },
        }}
      />
      {children}
    </AuthProvider>
  );
}
