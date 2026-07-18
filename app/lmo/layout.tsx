import LmoSidebar from "../ui/lmo-sidebar";

export default function LmoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden lg:flex-row">
      <LmoSidebar />
      <main className="flex-1 overflow-auto" style={{ backgroundColor: "#f5f5ef" }}>
        {children}
      </main>
    </div>
  );
}
