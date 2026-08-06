"use client";

export type ToastType = "success" | "error" | "info";

export function showToast(message: string, type: ToastType = "info", duration = 3000) {
  try {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const el = document.createElement("div");
    el.id = id;
    el.style.position = "fixed";
    el.style.right = "20px";
    el.style.bottom = "20px";
    el.style.zIndex = "9999";
    el.style.padding = "10px 14px";
    el.style.borderRadius = "10px";
    el.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
    el.style.color = "#fff";
    el.style.fontSize = "13px";
    el.style.maxWidth = "320px";
    el.style.backdropFilter = "blur(4px)";

    if (type === "success") el.style.background = "linear-gradient(90deg,#16a34a,#10b981)";
    else if (type === "error") el.style.background = "linear-gradient(90deg,#ef4444,#dc2626)";
    else el.style.background = "linear-gradient(90deg,#374151,#6b7280)";

    el.textContent = message;
    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transition = "opacity 300ms ease, transform 300ms ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
    }, duration - 300);

    setTimeout(() => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, duration + 50);
  } catch (e) {
    // fallback
    // eslint-disable-next-line no-console
    console.error("showToast error", e);
  }
}
