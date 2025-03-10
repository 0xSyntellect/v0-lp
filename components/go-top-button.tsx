"use client";

import { ArrowUp } from "lucide-react";

export default function GoTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 left-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-50"
      aria-label="Go to top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
