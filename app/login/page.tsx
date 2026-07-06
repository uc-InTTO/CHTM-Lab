"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../lib/firebase";

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
  const [mode, setMode] = useState<"signIn" | "register">("signIn");
  const [loginRole, setLoginRole] = useState<"student" | "instructor" | "lmo">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);

        router.push("/student");
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);

        if (loginRole === "student") {
          router.push("/student");
          return;
        }

        if (loginRole === "lmo") {
          router.push("/lmo");
          return;
        }

        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
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

      <form className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2 mb-5 rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signIn");
              setErrorMessage("");
            }}
            className="rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: mode === "signIn" ? "#2e7d32" : "transparent",
              color: mode === "signIn" ? "#ffffff" : "#4b5563",
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMessage("");
            }}
            className="rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: mode === "register" ? "#2e7d32" : "transparent",
              color: mode === "register" ? "#ffffff" : "#4b5563",
            }}
          >
            Registration
          </button>
        </div>

        {mode === "signIn" ? (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sign In As
            </label>
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setLoginRole("student")}
                className="rounded-lg px-2 py-2 text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: loginRole === "student" ? "#2e7d32" : "transparent",
                  color: loginRole === "student" ? "#ffffff" : "#4b5563",
                }}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setLoginRole("instructor")}
                className="rounded-lg px-2 py-2 text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: loginRole === "instructor" ? "#2e7d32" : "transparent",
                  color: loginRole === "instructor" ? "#ffffff" : "#4b5563",
                }}
              >
                Instructor
              </button>
              <button
                type="button"
                onClick={() => setLoginRole("lmo")}
                className="rounded-lg px-2 py-2 text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: loginRole === "lmo" ? "#2e7d32" : "transparent",
                  color: loginRole === "lmo" ? "#ffffff" : "#4b5563",
                }}
              >
                LMO Staff
              </button>
            </div>
          </div>
        ) : null}

        <h2 className="text-lg font-bold text-gray-900 mb-5">
          {mode === "signIn" ? "Sign In" : "Student Registration"}
        </h2>

        {mode === "register" ? (
          <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Registration is for students only. LMO staff and instructors will use their assigned email and password.
          </p>
        ) : null}

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

        {mode === "register" ? (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm bg-gray-100 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        ) : null}

        {errorMessage ? (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2e7d32" }}
        >
          {isSubmitting ? "Please wait..." : mode === "signIn" ? "Sign In" : "Create Account"}
        </button>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => router.push("/lmo")}
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
              onClick={() => router.push("/student")}
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
      </form>
    </div>
  );
}
