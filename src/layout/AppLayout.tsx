import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <TopBar />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>

        <BottomBar />
      </div>
    </div>
  );
}
