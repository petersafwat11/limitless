"use client";

import { useEffect, useRef } from "react";

export default function DashboardChatWidget() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Show widget if already loaded
    if (window.Tawk_API?.showWidget) {
      window.Tawk_API.showWidget();
      return;
    }

    // Prevent double initialization
    if (isInitialized.current || document.getElementById("tawk-script")) {
      // Script exists, just show the widget
      const checkAndShow = setInterval(() => {
        if (window.Tawk_API?.showWidget) {
          window.Tawk_API.showWidget();
          clearInterval(checkAndShow);
        }
      }, 100);
      return;
    }

    isInitialized.current = true;

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Inject script
    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = "https://embed.tawk.to/68ccb891f60acf1928976f5c/1j5fr1uc6";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    // Cleanup: hide widget when leaving dashboard
    return () => {
      if (window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  // Cleanup on unmount (when navigating away from dashboard)
  useEffect(() => {
    return () => {
      if (window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  return null;
}
