import StudentSidebar from "../ui/student-sidebar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden lg:flex-row">
      <StudentSidebar />
      <main className="flex-1 overflow-auto" style={{ backgroundColor: "#f5f5ef" }}>
        {children}
      </main>
    </div>
  );
}
