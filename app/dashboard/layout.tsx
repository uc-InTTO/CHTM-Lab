import InstructorSidebar from "../ui/instructor-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <InstructorSidebar />
      <main className="flex-1 overflow-auto" style={{ backgroundColor: "#f5f5ef" }}>
        {children}
      </main>
    </div>
  );
}
