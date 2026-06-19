"use client";

import { usePathname, useRouter } from "next/navigation";

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
function GridIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function MegaphoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 19-9-9 19-2-8-8-2z"/></svg>; }
function BellIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function BookIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>; }
function LayersIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>; }
function CartIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>; }
function ReturnIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>; }
function ClipboardCheckIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>; }
function ExternalLinkIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>; }
function AlertTriangleIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>; }
function TrashIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>; }
function ListIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>; }
function UserIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>; }
function ArchiveIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>; }
function BarChartIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>; }
function ClockIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function LogoutIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>; }

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { Icon: GridIcon, label: "Dashboard", href: "/lmo" },
      { Icon: MegaphoneIcon, label: "Announcements", href: "/lmo/announcements" },
      { Icon: BellIcon, label: "Notifications", href: "/lmo/notifications" },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { Icon: BookIcon, label: "Instructor Log", href: "/lmo/instructor-log" },
      { Icon: LayersIcon, label: "Floor / Station", href: "/lmo/floor-station" },
      { Icon: CartIcon, label: "Borrow", href: "/lmo/borrow" },
      { Icon: ReturnIcon, label: "Return", href: "/lmo/return" },
      { Icon: ClipboardCheckIcon, label: "Borrow Approvals", href: "/lmo/borrow-approvals" },
      { Icon: ExternalLinkIcon, label: "Non-CHTM Borrow", href: "/lmo/non-chtm-borrow" },
    ],
  },
  {
    label: "MONITORING",
    items: [
      { Icon: AlertTriangleIcon, label: "Breakages", href: "/lmo/breakages" },
      { Icon: TrashIcon, label: "Waste", href: "/lmo/waste" },
      { Icon: ListIcon, label: "My List", href: "/lmo/my-list" },
    ],
  },
  {
    label: "MORE",
    items: [
      { Icon: UserIcon, label: "My Records", href: "/lmo/my-records" },
      { Icon: ArchiveIcon, label: "Inventory", href: "/lmo/inventory" },
      { Icon: BarChartIcon, label: "Reports", href: "/lmo/reports" },
      { Icon: ClockIcon, label: "History", href: "/lmo/history" },
    ],
  },
];

export default function LmoSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className="flex flex-col h-screen shrink-0 overflow-hidden"
      style={{ backgroundColor: "#1e3320", width: "260px" }}
    >
      <div className="flex items-center gap-3 px-5 pt-6 pb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#2d5a30" }}>
          <BoxIcon />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">LMO System</p>
          <p className="text-xs" style={{ color: "#7aa87e" }}>LMO Custodian</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="text-xs font-semibold tracking-wider px-3 mb-2" style={{ color: "#4e7252" }}>
              {section.label}
            </p>
            {section.items.map(({ Icon, label, href }) => {
              const isActive = pathname === href;
              return (
                <button
                  key={href}
                  onClick={() => router.push(href)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-colors"
                  style={{
                    backgroundColor: isActive ? "#2d6a30" : "transparent",
                    color: isActive ? "#ffffff" : "#7aa87e",
                  }}
                >
                  <Icon />
                  {label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-5 pb-5 pt-3 border-t" style={{ borderColor: "#2a4a2d" }}>
        <div className="mb-3">
          <p className="text-white text-sm font-semibold">Demo LMO Custodian</p>
          <p className="text-xs mt-0.5" style={{ color: "#7aa87e" }}>admin@demo.chtm</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#2d6a30", color: "#a8e6ac" }}>
            LMO Custodian
          </span>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 text-sm mt-3 mb-4 transition-opacity hover:opacity-80"
          style={{ color: "#7aa87e" }}
        >
          <LogoutIcon />
          Exit Demo
        </button>
        <p className="text-xs" style={{ color: "#3d5a40" }}>UC-CHTM Lab v1.0</p>
      </div>
    </aside>
  );
}
