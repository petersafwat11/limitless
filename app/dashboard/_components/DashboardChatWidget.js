"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardChatWidget() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const [isWidgetReady, setIsWidgetReady] = useState(false);

  useEffect(() => {
    // Load Tawk.to script
    if (typeof window === "undefined") return;

    // Check if script already exists
    if (document.getElementById("tawk-script")) {
      // Script already loaded, just check if API is ready
      checkTawkReady();
      return;
    }

    // Create and inject script
    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = "https://embed.tawk.to/68ccb891f60acf1928976f5c/1j5fr1uc6";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Set up onLoad callback before script loads
    window.Tawk_API.onLoad = function () {
      console.log("Tawk.to loaded");
      setIsWidgetReady(true);
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Don't remove script on unmount to prevent reload issues
    };
  }, []);

  // Separate effect to check if Tawk is ready (for when script was already loaded)
  const checkTawkReady = () => {
    const checkInterval = setInterval(() => {
      if (window.Tawk_API && typeof window.Tawk_API.hideWidget === "function") {
        setIsWidgetReady(true);
        clearInterval(checkInterval);
      }
    }, 100);

    // Clear interval after 10 seconds to prevent infinite checking
    setTimeout(() => clearInterval(checkInterval), 10000);
  };

  // Control widget visibility based on pathname
  useEffect(() => {
    if (!isWidgetReady || typeof window === "undefined" || !window.Tawk_API) {
      return;
    }

    console.log("Pathname changed:", pathname, "isDashboard:", isDashboard);

    if (isDashboard) {
      console.log("Showing Tawk widget");
      window.Tawk_API.showWidget();
    } else {
      console.log("Hiding Tawk widget");
      window.Tawk_API.hideWidget();
    }
  }, [pathname, isDashboard, isWidgetReady]);

  return null; // This component doesn't render anything
}
