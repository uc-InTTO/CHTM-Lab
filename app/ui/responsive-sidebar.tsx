"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

/**
 * Shared sidebar chrome: static 260px aside on lg+, hamburger top bar with a
 * slide-in drawer below lg. Children provide the sidebar's inner content and
 * must fill height (the aside is a flex column).
 */
export default function ResponsiveSidebar({
  subtitle,
  children,
}: {
  subtitle: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever navigation happens
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar */}
      <header
        className="flex items-center gap-3 px-4 py-3 shrink-0 lg:hidden"
        style={{ backgroundColor: "#1e3320" }}
      >
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-white p-1 -ml-1"
        >
          <MenuIcon />
        </button>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#2d5a30" }}
        >
          <BoxIcon />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">LMO System</p>
          <p className="text-xs" style={{ color: "#9e9e9e" }}>{subtitle}</p>
        </div>
      </header>

      {/* Overlay behind the drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] max-w-[85vw] flex-col overflow-hidden transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#1e3320" }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute top-4 right-3 p-1 text-white/70 lg:hidden"
        >
          <CloseIcon />
        </button>
        {children}
      </aside>
    </>
  );
}
