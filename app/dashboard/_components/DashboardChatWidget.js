"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardChatWidget() {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Add CSS to hide widget by default to prevent flash
    const style = document.createElement("style");
    style.id = "tawk-hide-style";
    style.innerHTML = `
      .tawk-min-container,
      #tawk-bubble-container,
      iframe[title="chat widget"] {
        opacity: 0 !important;
        visibility: hidden !important;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .tawk-show {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    if (!document.getElementById("tawk-hide-style")) {
      document.head.appendChild(style);
    }

    // If already loaded
    if (document.getElementById("tawk-script")) {
      waitForTawk();
      return;
    }

    // Inject script
    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = "https://embed.tawk.to/68ccb891f60acf1928976f5c/1j5fr1uc6";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    window.Tawk_API.onLoad = () => {
      // Prevent auto-maximize
      window.Tawk_API.maximize = function () {};

      // Show widget with CSS class after load
      const containers = document.querySelectorAll(
        '.tawk-min-container, #tawk-bubble-container, iframe[title="chat widget"]'
      );
      containers.forEach((el) => el.classList.add("tawk-show"));

      setIsReady(true);
    };

    document.body.appendChild(script);
  }, []);

  const waitForTawk = () => {
    const timer = setInterval(() => {
      if (window.Tawk_API) {
        // Prevent auto-maximize
        window.Tawk_API.maximize = function () {};

        // Show widget with CSS class
        const containers = document.querySelectorAll(
          '.tawk-min-container, #tawk-bubble-container, iframe[title="chat widget"]'
        );
        containers.forEach((el) => el.classList.add("tawk-show"));

        setIsReady(true);
        clearInterval(timer);
      }
    }, 100);
  };

  // Show/hide widget based on pathname
  useEffect(() => {
    if (!isReady || typeof window === "undefined") return;

    const containers = document.querySelectorAll(
      '.tawk-min-container, #tawk-bubble-container, iframe[title="chat widget"]'
    );

    if (isDashboard) {
      // Show widget on dashboard pages
      containers.forEach((el) => el.classList.add("tawk-show"));
    } else {
      // Hide widget on non-dashboard pages
      containers.forEach((el) => el.classList.remove("tawk-show"));
    }
  }, [isDashboard, isReady, pathname]);

  return null;
}
