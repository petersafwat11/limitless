"use client";

import { Suspense } from "react";
import Header from "@/ui/layout/header/Header";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import DashboardChatWidget from "./dashboard/_components/DashboardChatWidget";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Pages that use GetQuoteHeaderWithNav - don't add padding-top on these
  const pagesWithCustomHeader = [
    "/login",
    "/forget-password",
    "/change-password",
    "/retrieve-quote",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookies-policy",
    "/complaints",
    "/faq",
  ];

  const hasNormalHeader = !(
    pagesWithCustomHeader.includes(pathname) ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/payment") ||
    pathname.includes("/get-quote")
  );

  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      <Suspense fallback={<div style={{ height: "80px" }} />}>
        <Header />
      </Suspense>
      <div className={hasNormalHeader ? "has-normal-header" : ""}>
        {children}
      </div>
      {isDashboard && <DashboardChatWidget />}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        limit={1}
        style={{
          fontSize: "16px",
        }}
      />
    </>
  );
}
