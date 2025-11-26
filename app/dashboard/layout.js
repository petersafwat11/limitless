import "../globals.css";
import { Poppins } from "next/font/google";
import SideNavbar from "@/ui/dashboard/layout/sideNavbar/SideNavbar";
import Header from "@/ui/dashboard/header/Header";
import DashboardChatWidget from "./_components/DashboardChatWidget";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="dashboard-content">
        <div className="nav">
          <SideNavbar />
        </div>
        <div className="pageContainer">{children}</div>
      </main>
      <DashboardChatWidget />
    </div>
  );
}
