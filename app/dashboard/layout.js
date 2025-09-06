import "../globals.css";
import { Poppins } from "next/font/google";
import SideNavbar from "@/ui/dashboard/layout/sideNavbar/SideNavbar";
import Header from "@/ui/dashboard/header/Header";
import { ClaimProvider } from "@/contexts/ClaimContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({ children }) {
  return (
    <ClaimProvider>
      <div>
        <Header />
        <main className="dashboard-content">
          <div className="nav">
            <SideNavbar />
          </div>
          {children}
        </main>
      </div>
    </ClaimProvider>
  );
}
