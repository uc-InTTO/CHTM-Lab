"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function BoxIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    router.push("/dashboard");
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#1e3320" }}
    >
      <div className="flex flex-col items-center mb-6 gap-2">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
          style={{ backgroundColor: "#2d5a30" }}
        >
          <BoxIcon />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">LMO System</h1>
        <p className="text-sm text-gray-400">
          Logistics Management Office — CHTM Laboratory
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Sign In</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm bg-gray-100 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-11 rounded-xl text-sm bg-gray-100 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignIn}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2e7d32" }}
        >
          Sign In
        </button>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="p-3 rounded-xl text-left transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#f5f0ff" }}
            >
              <p className="font-semibold text-sm" style={{ color: "#7c3aed" }}>
                LMO Custodian
              </p>
              <p className="text-xs mt-1" style={{ color: "#9d71f5" }}>
                Full access — inventory, reports, all logs
              </p>
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="p-3 rounded-xl text-left transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#eff6ff" }}
            >
              <p className="font-semibold text-sm" style={{ color: "#2563eb" }}>
                Instructor
              </p>
              <p className="text-xs mt-1" style={{ color: "#5b93f5" }}>
                Dashboard, borrow, logs, waste, breakages
              </p>
            </button>
            <button
              type="button"
              className="p-3 rounded-xl text-left transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#fefce8" }}
            >
              <p className="font-semibold text-sm" style={{ color: "#b45309" }}>
                Student
              </p>
              <p className="text-xs mt-1" style={{ color: "#d97706" }}>
                Announcements, borrow view, breakages, history
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
