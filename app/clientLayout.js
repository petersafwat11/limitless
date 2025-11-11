"use client";

import Header from "@/ui/layout/header/Header";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

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
    "/FAQ",
  ];

  const hasNormalHeader = !(
    pagesWithCustomHeader.includes(pathname) ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/payment") ||
    pathname.includes("/get-quote")
  );

  return (
    <>
      <Header />
      <div className={hasNormalHeader ? "has-normal-header" : ""}>
        {children}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme="light"
        limit={1}
      />
    </>
  );
}
