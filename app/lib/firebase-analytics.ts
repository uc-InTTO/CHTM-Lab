"use client";

import { getAnalytics } from "firebase/analytics";
import { app } from "./firebase";

export function initAnalytics() {
  if (typeof window !== "undefined") {
    return getAnalytics(app);
  }
  return null;
}
